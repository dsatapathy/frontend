import {
  getBreak,
  getCommonContainer,
  getCommonGrayCard,
  getCommonSubHeader,
  getLabel,
  getLabelWithValue,
} from "egov-ui-framework/ui-config/screens/specs/utils";
import { getQueryArg } from "egov-ui-framework/ui-utils/commons";
import { checkValueForNA, convertEpochToDate } from "../../../utils/index";
import { changeStep } from "../footer";

const getHeader = (label) => {
  return {
    uiFramework: "custom-molecules-local",
    moduleName: "egov-bpa",
    componentPath: "DividerWithLabel",
    props: {
      className: "hr-generic-divider-label",
      labelProps: {},
      dividerProps: {},
      label,
    },
    type: "array",
  };
};

export const basicSummary = getCommonGrayCard({
  header: {
    uiFramework: "custom-atoms",
    componentPath: "Container",
    props: {
      style: { marginBottom: "10px" },
    },
    children: {
      header: {
        gridDefination: {
          xs: 8,
        },
        ...getCommonSubHeader({
          labelName: "Basic Details",
          labelKey: "BPA_BASIC_DETAILS_TITLE",
        }),
      },
      editSection: {
        componentPath: "Button",
        props: {
          color: "primary",
          style: {
            marginTop: "-10px",
            marginRight: "-18px",
          },
        },
        gridDefination: {
          xs: 4,
          align: "right",
        },
        children: {
          editIcon: {
            uiFramework: "custom-atoms",
            componentPath: "Icon",
            props: {
              iconName: "edit",
            },
          },
          buttonLabel: getLabel({
            labelName: "Edit",
            labelKey: "BPA_SUMMARY_EDIT",
          }),
        },
        onClickDefination: {
          action: "condition",
          callBack: (state, dispatch) => {
            changeStep(state, dispatch, "", 0);
          },
        },
      },
    },
  },
  bpaBasicDetailsContainer: getHeader({
    labelName: "Basic Details",
    labelKey: "BPA_BASIC_DETAILS_TITLE",
  }),
  break1: getBreak(),
  basicDetailsContainer: getCommonContainer({
    scrutinynumber: getLabelWithValue(
      {
        labelName: "Building plan scrutiny number",
        labelKey: "BPA_BASIC_DETAILS_SCRUTINY_NUMBER_LABEL",
      },
      {
        jsonPath: "BPA.edcrNumber",
        callBack: checkValueForNA,
      }
    ),
    occupancy: getLabelWithValue(
      {
        labelName: "occupancy",
        labelKey: "BPA_BASIC_DETAILS_OCCUPANCY_LABEL",
      },
      {
        jsonPath: "scrutinyDetails.planDetail.planInformation.occupancy",
        callBack: checkValueForNA,
      }
    ),
    applicationtype: getLabelWithValue(
      {
        labelName: "Application Type",
        labelKey: "BPA_BASIC_DETAILS_APPLICATION_TYPE_LABEL",
      },
      {
        localePrefix: {
          moduleName: "WF",
          masterName: "BPA",
        },
        jsonPath: "BPA.applicationType",
        callBack: checkValueForNA,
      }
    ),
    servicetype: getLabelWithValue(
      {
        labelName: "Service Type",
        labelKey: "Service Type",
      },
      {
        jsonPath: "BPA.serviceType",
        callBack: checkValueForNA,
      }
    ),
    risktype: getLabelWithValue(
      {
        labelName: "Risk Type",
        labelKey: "BPA_BASIC_DETAILS_RISK_TYPE_LABEL",
      },
      {
        jsonPath: "BPA.riskType",
        callBack: checkValueForNA,
      }
    ),
    preApprovedCode: getLabelWithValue(
      {
        labelName: "Preapproved Code",
        labelKey: "PREAPPROVE_IDENTIFY_CODE"
      },
      {
        jsonPath: "BPA.additionalDetails.preApprovedCode",
        callBack: checkValueForNA,
      }
    ),
    applicationdate: getLabelWithValue(
      {
        labelName: "Application Date",
        labelKey: "BPA_BASIC_DETAILS_APP_DATE_LABEL",
      },
      {
        jsonPath: "scrutinyDetails.planDetail.applicationDate",
        callBack: (value) => {
          return convertEpochToDate(value) || checkValueForNA;
        },
      }
    ),
    remarks: getLabelWithValue(
      {
        labelName: "Remarks",
        labelKey: "BPA_BASIC_DETAILS_REMARKS_LABEL",
      },
      {
        jsonPath: "BPA.additionalDetails.remarks",
        callBack: checkValueForNA,
      }
    ),
  }),
  BlockWiseOccupancyAndUsageDetails: getHeader({
    labelName: "BPA Location Details",
    labelKey: "BPA_NEW_TRADE_DETAILS_HEADER_DETAILS",
  }),
  break3: getBreak(),
  viewFour: getCommonContainer({
    reviewCity: getLabelWithValue(
      {
        labelName: "City",
        labelKey: "BPA_CITY_LABEL",
      },
      {
        jsonPath: "BPA.landInfo.address.city",
        callBack: (value) => {
          return getQueryArg(window.location.href, "tenantId");
        },
      }
    ),
    reviewBuildingName: getLabelWithValue(
      {
        labelName: "Building/Company Name",
        labelKey: "BPA_DETAILS_BLDG_NAME_LABEL",
      },
      {
        jsonPath: "BPA.landInfo.address.buildingName",
        callBack: checkValueForNA,
      }
    ),
    reviewStreetName: getLabelWithValue(
      {
        labelName: "Street Name",
        labelKey: "BPA_DETAILS_SRT_NAME_LABEL",
      },
      { jsonPath: "BPA.landInfo.address.street", callBack: checkValueForNA }
    ),
    reviewMohalla: getLabelWithValue(
      {
        labelName: "Mohalla",
        labelKey: "BPA_DETAILS_MOHALLA_LABEL",
      },
      {
        jsonPath: "BPA.landInfo.address.locality.code",
        localePrefix: {
          moduleName: getQueryArg(window.location.href, "tenantId")
            ? getQueryArg(window.location.href, "tenantId")
                .replace(".", "_")
                .toUpperCase()
            : "",
          masterName: "REVENUE",
        },
        callBack: checkValueForNA,
      }
    ),
    reviewPincode: getLabelWithValue(
      {
        labelName: "Pincode",
        labelKey: "BPA_DETAILS_PIN_LABEL",
      },
      { jsonPath: "BPA.landInfo.address.pincode", callBack: checkValueForNA }
    ),
  }),

  DetailsOfPlot: getHeader({
    labelName: "Details Of Plot",
    labelKey: "BPA_BOUNDARY_PLOT_DETAILS_TITLE",
  }),
  break2: getBreak(),
  detailsOfPlotContainer: getCommonContainer({
    plotArea: getLabelWithValue(
      {
        labelName: "Plot Area",
        labelKey: "BPA_BOUNDARY_PLOT_AREA_LABEL",
      },
      {
        jsonPath: "BPA.additionalDetails.planDetail.plot.area",
        callBack: checkValueForNA,
      }
    ),
    kathaNumber: getLabelWithValue(
      {
        labelName: "Khata No.",
        labelKey: "BPA_BOUNDARY_KHATA_NO_LABEL",
      },
      {
        jsonPath: "BPA.additionalDetails.planDetail.planInformation.khataNo",
        callBack: checkValueForNA,
      }
    ),
    holdingNumber: getLabelWithValue(
      {
        labelName: "Holding No.",
        labelKey: "BPA_BOUNDARY_HOLDING_NO_LABEL",
      },
      {
        jsonPath: "BPA.additionalDetails.planDetail.planInformation.holdingNo",
        callBack: checkValueForNA,
      }
    ),
    plotNo: getLabelWithValue(
      {
        labelName: "Plot No(MSP)",
        labelKey: "BPA_BOUNDARY_PLOT_NO_LABEL",
      },
      {
        jsonPath: "BPA.additionalDetails.planDetail.plot.plotNo",
        callBack: checkValueForNA,
      }
    ),
    choosePlotType: getLabelWithValue(
      {
        labelName:
          "Whether Plot is part of government scheme(BDA/GA/OSHB) or private approved lay out",
        labelKey: "PREAPPROVE_PLOT_SCHEME_HEADER",
      },
      {
        jsonPath: "BPA.additionalDetails.planDetail.plot.plotScheme",
        callBack: checkValueForNA,
      }
    ),
    chooseLayoutType: getLabelWithValue(
      {
        labelName:
          "Whether the Plot is part of Approved layout/ Town Planning scheme/ Government Scheme ",
        labelKey: "PREAPPROVE_LAYOUT_TYPE_HEADER",
      },
      {
        jsonPath: "BPA.additionalDetails.planDetail.plot.layoutType",
        callBack: checkValueForNA,
      }
    ),
    landStatus: getLabelWithValue(
      {
        labelName: "Land Status",
        labelKey: "PREAPPROVE_LAND_STATUS",
      },
      {
        jsonPath: "BPA.additionalDetails.planDetail.plot.landStatus",
        callBack: checkValueForNA,
      }
    ),
    projectComponent: getLabelWithValue(
      {
        labelName: "Project Component",
        labelKey: "PREAPPROVE_PROJECT_COMPONENT",
      },
      {
        jsonPath: "BPA.additionalDetails.planDetail.plot.project",
        callBack: checkValueForNA,
      }
    ),
    layoutType: getLabelWithValue(
      {
        labelName: "Layout Type",
        labelKey: "PREAPPROVE_LAYOUT_TYPE",
      },
      {
        jsonPath: "BPA.additionalDetails.planDetail.plot.layout",
        callBack: checkValueForNA,
      }
    ),
    landRegDetails: getLabelWithValue(
      {
        labelName: "Land Registration Details",
        labelKey: "BPA_BOUNDARY_LAND_REG_DETAIL_LABEL",
      },
      {
        jsonPath: "BPA.additionalDetails.registrationDetails",
        callBack: checkValueForNA,
      }
    ),
  }),
  DetailsOfLand: getHeader({
    labelName: "Land Details",
    labelKey: "PREAPPROVE_LAND_DETAILS_TITLE",
  }),
  break2: getBreak(),
  detailsOfLandContainer: getCommonContainer({
    layout: getLabelWithValue(
      {
        labelName: "Name of Lessor / Government Body",
        labelKey: "PREAPPROVE_GOVERNMENT_BODY",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.governementBody",
        callBack: checkValueForNA,
      }
    ),
    governmentScheme: getLabelWithValue(
      {
        labelName: "Name of Government Scheme",
        labelKey: "PREAPPROVE_GOVERNMENT_SCHEME",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.governmentScheme",
        callBack: checkValueForNA,
      }
    ),
    schemePlotNumber: getLabelWithValue(
      {
        labelName: "Scheme plot Number",
        labelKey: "PREAPPROVE_SCHEME_PLOT",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.schemePlotNumber",
        callBack: checkValueForNA,
      }
    ),
    schemePlotNumber: getLabelWithValue(
      {
        labelName: "Scheme plot Number",
        labelKey: "PREAPPROVE_SCHEME_PLOT",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.schemePlotNumber",
        callBack: checkValueForNA,
      }
    ),
    revenuePlotNumber: getLabelWithValue(
      {
        labelName: "Revenue plot Number",
        labelKey: "PREAPPROVE_REVENUE_PLOT",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.revenuePlotNumber",
        callBack: checkValueForNA,
      }
    ),
    revenueVillage: getLabelWithValue(
      {
        labelName: "Revenue village / Mauza",
        labelKey: "PREAPPROVE_REVENUE_VILLAGE",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.revenueVillage",
        callBack: checkValueForNA,
      }
    ),
    kisam: getLabelWithValue(
      {
        labelName: "Kisam",
        labelKey: "PREAPPROVE_KISAM",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.kisam",
        callBack: checkValueForNA,
      }
    ),
    widthInFt: getLabelWithValue(
      {
        labelName: "Width of plot(in ft.)",
        labelKey: "PREAPPROVE_PLOT_WITH_IN_FT",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.widthInFt",
        callBack: checkValueForNA,
      }
    ),
    lengthInFt: getLabelWithValue(
      {
        labelName: "Length of plot(in ft.)",
        labelKey: "PREAPPROVE_PLOT_LENGTH_IN_FT",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.lengthInFt",
        callBack: checkValueForNA,
      }
    ),
    abuttingRoadWidthInMt: getLabelWithValue(
      {
        labelName: "Abutting road width(in m.)",
        labelKey: "PREAPPROVE_ABUTTING_ROAD",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.abuttingRoadWidth",
        callBack: checkValueForNA,
      }
    ),
    layoutApprovalDate: getLabelWithValue(
      {
        labelName: "Date of Layout Approval",
        labelKey: "PREAPPROVE_DATE_LABEL",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.layoutApprovalDate",
        callBack: checkValueForNA,
      }
    ),
    layoutPlotNumber: getLabelWithValue(
      {
        labelName: "Layout plot Number",
        labelKey: "PREAPPROVE_LAYOUT_PLOT",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.layoutPlotNumber",
        callBack: checkValueForNA,
      }
    ),
    roadDetails: getLabelWithValue(
      {
        labelName:
          "Whether Roads/open spaces/ Drain have been gifted to ULB/Government Body",
        labelKey: "PREAPPROVE_ROAD_DETAILS",
      },
      {
        jsonPath: "BPA.additionalDetails.landDetails.roadDetails",
        callBack: checkValueForNA,
      }
    ),
  }),
});
