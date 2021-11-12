import {
  prepareFinalObject,
  handleScreenConfigurationFieldChange as handleField
} from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  updatePFOforSearchResults,
  getBoundaryData
} from "../../../../ui-utils/commons";
import get from "lodash/get";
import set from "lodash/set";
import { footer } from "../mr/applyResource/footer";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import {
  header,
  formwizardFirstStep,
  formwizardSecondStep,
  formwizardThirdStep,
  formwizardFourthStep,
  formwizardFifthStep,
  stepper,
  getMdmsData,
  setDataForApplication
} from "../mr/apply";

import { fetchLocalizationLabel } from "egov-ui-kit/redux/app/actions";
import { getLocale } from "egov-ui-kit/utils/localStorageUtils";
import {
  dispatchMultipleFieldChangeAction
} from "egov-ui-framework/ui-config/screens/specs/utils";

const getData = async (action, state, dispatch, tenantId) => {
  await getMdmsData(action, state, dispatch);
  //await getAllDataFromBillingSlab(tenantId, dispatch);
  await getBoundaryData(action, state, dispatch, [
    { key: "tenantId", value: tenantId }
  ]);

  dispatch(
    prepareFinalObject(
      "MarriageRegistrations[0].tenantId",
      tenantId
    )
  );


  dispatch(
    prepareFinalObject(
      "MarriageRegistrations[0].coupleDetails[0].bride.title",
      "MRs"
    )
  );
  dispatch(
    prepareFinalObject(
      "MarriageRegistrations[0].coupleDetails[0].groom.title",
      "MR"
    )
  );

  dispatch(
    prepareFinalObject(
      "MarriageRegistrations[0].coupleDetails[0].bride.tenantId",
      tenantId
    )
  );
  dispatch(
    prepareFinalObject(
      "MarriageRegistrations[0].coupleDetails[0].groom.tenantId",
      tenantId
    )
  );
  dispatch(
    prepareFinalObject(
      "MarriageRegistrations[0].coupleDetails[0].bride.isGroom",
      false
    )
  );
  dispatch(
    prepareFinalObject(
      "MarriageRegistrations[0].coupleDetails[0].groom.isGroom",
      true
    )
  );
  dispatch(
    prepareFinalObject(
      "MarriageRegistrations[0].applicationType",
      "NEW"
    )
  );
  if (process.env.REACT_APP_NAME == "Citizen") {
    const hidePrimaryOwnerSection = [
      {
        path: "components.div.children.formwizardFirstStep.children.primaryOwnerDetails",
        property: "visible",
        value: false
      }


    ];
    dispatchMultipleFieldChangeAction("apply", hidePrimaryOwnerSection, dispatch);
  }

};
const updateSearchResults = async (
  action,
  state,
  dispatch,
  queryValue,
  tenantId
) => {
  await getData(action, state, dispatch, tenantId);
  await updatePFOforSearchResults(
    action,
    state,
    dispatch,
    queryValue,
    tenantId
  );
  const queryValueFromUrl = getQueryArg(
    window.location.href,
    "applicationNumber"
  );
  if (!queryValueFromUrl) {
    dispatch(
      prepareFinalObject(
        "Licenses[0].oldLicenseNumber",
        get(
          state.screenConfiguration.preparedFinalObject,
          "Licenses[0].applicationNumber",
          ""
        )
      )
    );
    dispatch(prepareFinalObject("Licenses[0].applicationNumber", ""));
    dispatch(
      handleField(
        "apply",
        "components.div.children.headerDiv.children.header.children.applicationNumber",
        "visible",
        false
      )
    );
  }else{
    setDataForApplication(action, state, dispatch);
  }
};
const screenConfig = {
  uiFramework: "material-ui",
  name: "apply",
  beforeInitScreen: (action, state, dispatch) => {
    const queryValue = getQueryArg(window.location.href, "applicationNumber");
    const tenantId = getQueryArg(window.location.href, "tenantId");
    const applicationNo = queryValue;

    if (applicationNo) {
      updateSearchResults(action, state, dispatch, applicationNo, tenantId);

      //dispatch(prepareFinalObject("DynamicMdms.TradeLicense.tradeUnits.MdmsJson", null));

    } else {

      getData(action, state, dispatch, tenantId);


      dispatch(prepareFinalObject("MarriageRegistrations[0].coupleDetails[0].bride.address.country", "INDIA"));
      dispatch(prepareFinalObject("MarriageRegistrations[0].coupleDetails[0].groom.address.country", "INDIA"));
      // dispatch(prepareFinalObject("MarriageRegistrations[0].coupleDetails[0].bride.isDivyang", "No"));
      // dispatch(prepareFinalObject("MarriageRegistrations[0].coupleDetails[0].groom.isDivyang", "No"));
      dispatch(fetchLocalizationLabel(getLocale(), tenantId, tenantId));

    }
    return action;
  },
  components: {
    div: {
      uiFramework: "custom-atoms",
      componentPath: "Div",
      props: {
        className: "common-div-css"
      },
      children: {
        headerDiv: {
          uiFramework: "custom-atoms",
          componentPath: "Container",
          children: {
            header: {
              gridDefination: {
                xs: 12,
                sm: 10
              },
              ...header
            }
          }
        },
        stepper,
        formwizardFirstStep,
        formwizardSecondStep,
        formwizardThirdStep,
        formwizardFourthStep,
        formwizardFifthStep,
        footer
      }
    },
    // breakUpDialog: {
    //   uiFramework: "custom-containers-local",
    //   moduleName: "egov-tradelicence",
    //   componentPath: "ViewBreakupContainer",
    //   props: {
    //     open: false,
    //     maxWidth: "md",
    //     screenKey: "apply"
    //   }
    // }
  }
};

export default screenConfig;
