const commonConfig = {
  MAP_API_KEY: "AIzaSyCH9PmCbk_mcpgijAAlTeltC4deOxC5wEM",
  tenantId: process.env.REACT_APP_DEFAULT_TENANT_ID,
  // forgotPasswordTenant: "od.amritsar",
};

/**
 * Define Global Constants value for egov-bpa.
 * features --- features you would like to make visible and hidden
 */

export const CONSTANTS = {
  features: {
    isPreApprovedCitizenActive: true,
  },
};

export default commonConfig;
