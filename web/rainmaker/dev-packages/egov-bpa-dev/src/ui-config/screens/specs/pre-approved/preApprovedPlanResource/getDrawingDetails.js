import {
  handleScreenConfigurationFieldChange as handleField,
  prepareFinalObject,
  toggleSnackbar,
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {getTransformedLocale} from "egov-ui-framework/ui-utils/commons";
import { httpRequest } from "../../../../../ui-utils/api";
import get from "lodash/get";
export const getDrawingDetails = async (state, dispatch, fieldInfo=false) => {
  let drawingAppNo = ''
  try {
    if(!fieldInfo) {
      drawingAppNo = get(
        state.screenConfiguration.preparedFinalObject,
        `preApprovedPlan.drawingAppNo`,
        ""
      );
    } else {
      drawingAppNo = get(
        state.screenConfiguration.preparedFinalObject,
        `BPA.edcrNumber`,
        ""
      );
    }
    

    let queryObject = {
      preapprovedPlanSearchCriteria: {
        drawingNo: drawingAppNo,
      },
    };
    const drawingDetails = await httpRequest(
      "post",
      "/bpa-services/v1/preapprovedplan/_search",
      "_search",
      [],
      queryObject
    );
    if(drawingDetails && drawingDetails.preapprovedPlan &&
      drawingDetails.preapprovedPlan.length > 0){
      
      drawingDetails.preapprovedPlan.forEach((data, index) => {
        //   Todo list
        console.log("data............", data);
        dispatch(prepareFinalObject("PA.preApprovedPlanDetails", data));
        dispatch(
          prepareFinalObject(
            "PA.subOccupancy",
            getTransformedLocale(data.drawingDetail.subOccupancy.label)
          )
        );
        dispatch(
          prepareFinalObject(
            "BPA.applicationType",
            data.drawingDetail.applicationType
          )
        );
        dispatch(
          prepareFinalObject(
            "scrutinyDetails.planDetail.planInformation.occupancy",
            data.drawingDetail.occupancy
          )
        );

        dispatch(
          prepareFinalObject("BPA.serviceType", data.drawingDetail.serviceType)
        );
        dispatch(prepareFinalObject("BPA.businessService", "BPA6"));
        // Risk type is hardcoded
        dispatch(prepareFinalObject("BPA.riskType", "LOW"));
        dispatch(prepareFinalObject("BPA.edcrNumber", data.drawingNo));
        dispatch(
          prepareFinalObject("scrutinyDetails.edcrNumber", data.drawingNo)
        );
        dispatch(
          prepareFinalObject("BPAs.appdate", data.auditDetails.createdTime)
        );
        // dispatch(prepareFinalObject("BPA.documents", data.documents));
        dispatch(
          prepareFinalObject(
            "scrutinyDetails.planDetail.plot.area",
            data.drawingDetail.plotArea
          )
        );
        dispatch(
          prepareFinalObject(
            "scrutinyDetails.planDetail.blocks",
            data.drawingDetail.blocks
          )
        );

        dispatch(
          prepareFinalObject(
            "scrutinyDetails.planDetail.virtualBuilding.totalBuitUpArea",
            data.drawingDetail.plotArea
          )
        );
      });
      } else {
        dispatch(prepareFinalObject("PA", {}));
        dispatch(
          prepareFinalObject(
            "BPA",
            {}
          )
        );
        dispatch(
          prepareFinalObject(
            "scrutinyDetails",
            {}
          )
        );
        dispatch(
          toggleSnackbar(
            true,
            { labelName: "Not a Valid Drawing Number.", labelKey: "BPA_INVALID_DRAWING_NO" },
            "info"
          )
        );
      }
    
  } catch (e) {
    dispatch(
      toggleSnackbar(
        true,
        { labelName: e.message, labelKey: e.message },
        "info"
      )
    );
  }
};
