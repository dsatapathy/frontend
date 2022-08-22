export const propertyWiseCollectionForm = [
    {
        key: "ulbName",
        type: "select",
        placeholderLabelKey: "Select ULB Name",
        gridSm: 4,
        jsonPath: "reportForm.ulbName",
        sourceJsonPath: "applyScreenMdmsData.tenant.tenants",
        required: true,
        labelKey: "ULB Name",
        localePrefix: {
          moduleName: "TENANT",
          masterName: "TENANTS",
        },
    },
    {
        key: "propertyId",
        type: "text",
        placeholderLabelKey: "Enter property Id",
        gridSm: 4,
        jsonPath: "reportForm.propertyId",
        required: false,
        labelKey: "Property Id",
    },
    {
        key: "oldPropertyId",
        type: "text",
        placeholderLabelKey: "Enter old property Id",
        gridSm: 4,
        jsonPath: "reportForm.oldPropertyId",
        required: false,
        labelKey: "Old Property Id",
    },
    {
        key: "wardNo",
        type: "text",
        jsonPath: "reportForm.wardNo",
        labelKey: "Tax Ward",
        placeholderLabelKey: "Enter Tax Ward",
        gridSm: 4,
        required: false,
      }
]