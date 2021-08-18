import { Dialog, DialogContent } from "@material-ui/core";
import Label from "egov-ui-kit/utils/translationNode";
import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid, Typography, Button } from "@material-ui/core";
import { Container } from "egov-ui-framework/ui-atoms";
import store from "ui-redux/store";
import { prepareFinalObject,toggleSnackbar } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {
  LabelContainer,
  TextFieldContainer
} from "egov-ui-framework/ui-containers";
import CloseIcon from "@material-ui/icons/Close";
import "./index.css";
import {
    handleScreenConfigurationFieldChange as handleField
  } from "egov-ui-framework/ui-redux/screen-configuration/actions";
import {DocumentListContainer} from '../'
import { getLoggedinUserRole } from "../../ui-config/screens/specs/utils/index.js";
import { getTransformedLocale } from "egov-ui-framework/ui-utils/commons";
const fieldConfig = {
    nocType: {
        label: {
          labelName: "NOC Type",
          labelKey: "BPA_NOC_TYPE_LABEL"
        },
        placeholder: {
          labelName: "Select NOC Type",
          labelKey: "BPA_NOC_TYPE_PLACEHOLDER"
        }
      }
  };
  
class NewNocContainer extends Component {
  state = {
    comments : ''
  }

  prepareDocumentsForPayload = async (wfState) => {
    const {preparedFinalObject} = this.props
    const {nocDocumentsDetailsRedux} = preparedFinalObject
    let appDocumentList = nocDocumentsDetailsRedux
    let documnts = [];
    if (appDocumentList) {
      Object.keys(appDocumentList).forEach(function (key) {
        if (appDocumentList && appDocumentList[key]) {
          documnts.push(appDocumentList[key]);
        }
      });
    }

    // prepareFinalObject("nocDocumentsDetailsRedux", {});
    let requiredDocuments = [], uploadingDocuments = [];
    if (documnts && documnts.length > 0) {
      documnts.forEach(documents => {
        if (documents && documents.documents) {
          documents.documents.map(docs => {
            let doc = {};
            doc.documentType = documents.documentCode;
            doc.fileStoreId = docs.fileStoreId;
            doc.fileStore = docs.fileStoreId;
            doc.fileName = docs.fileName;
            doc.fileUrl = docs.fileUrl;
            doc.isClickable = true;
            doc.additionalDetails = {
              uploadedBy: getLoggedinUserRole(wfState),
              uploadedTime: new Date().getTime()
            }
            if (doc.id) {
              doc.id = docs.id;
            }
            uploadingDocuments.push(doc);
          })
        }
      });

      let diffDocs = [];
      // documentsFormat && documentsFormat.length > 0 && documentsFormat.forEach(nocDocs => {
      //   if (nocDocs) {
      //     diffDocs.push(nocDocs);
      //   }
      // });

      // if (uploadingDocuments && uploadingDocuments.length > 0) {
      //   uploadingDocuments.forEach(tDoc => {
      //     diffDocs.push(tDoc);
      //   })
      // };
      store.dispatch(prepareFinalObject("payloadDocumentFormat",uploadingDocuments));

      // if (documentsFormat && documentsFormat.length > 0) {
      //   documentsFormat = diffDocs;
      //   prepareFinalObject("payloadDocumentFormat",documentsFormat);
      // }
    }
  }

  saveDetails = () => {
    this.prepareDocumentsForPayload("")
    store.dispatch(handleField(
        "search-preview",
        "components.div.children.newNoc.props",
        "open",
        false
      ))
  }

  resetMessage = () => {
    this.setState({
      comments:""
    })
  }

  prepareDocumentsUploadData = (state, dispatch) => {
    // let documents = get(
    //     state,
    //     `screenConfiguration.preparedFinalObject.applyScreenMdmsData.ws-services-masters.${currentDoc}`,
    //     []
    // );
    let documents = [{"code":"OWNER.IDENTITYPROOF","documentType":"OWNER","required":true,"active":true,"hasDropdown":true,"dropdownData":[{"code":"OWNER.IDENTITYPROOF.AADHAAR","active":true},{"code":"OWNER.IDENTITYPROOF.VOTERID","active":true},{"code":"OWNER.IDENTITYPROOF.DRIVING","active":true},{"code":"OWNER.IDENTITYPROOF.PAN","active":true},{"code":"OWNER.IDENTITYPROOF.PASSPORT","active":true}],"description":"OWNER.ADDRESSPROOF.IDENTITYPROOF_DESCRIPTION"},{"code":"OWNER.ADDRESSPROOF","documentType":"OWNER","required":true,"active":true,"hasDropdown":true,"dropdownData":[{"code":"OWNER.ADDRESSPROOF.ELECTRICITYBILL","active":true},{"code":"OWNER.ADDRESSPROOF.DL","active":true},{"code":"OWNER.ADDRESSPROOF.VOTERID","active":true},{"code":"OWNER.ADDRESSPROOF.AADHAAR","active":true},{"code":"OWNER.ADDRESSPROOF.PAN","active":true},{"code":"OWNER.ADDRESSPROOF.PASSPORT","active":true}],"description":"OWNER.ADDRESSPROOF.ADDRESSPROOF_DESCRIPTION"},{"code":"ELECTRICITY_BILL","documentType":"ELECTRICITY_BILL","active":true,"required":true,"description":"ELECTRICITY_BILL_DESCRIPTION"},{"code":"PLUMBER_REPORT_DRAWING","documentType":"PLUMBER_REPORT_DRAWING","active":true,"required":true,"description":"PLUMBER_REPORT_DRAWING_DESCRIPTION"},{"code":"BUILDING_PLAN_OR_COMPLETION_CERTIFICATE","documentType":"BUILDING_PLAN_OR_COMPLETION_CERTIFICATE","active":true,"required":false,"description":"BUILDING_PLAN_OR_COMPLETION_CERTIFICATE_DESCRIPTION"},{"code":"PROPERTY_TAX_RECIEPT","documentType":"PROPERTY_TAX_RECIEPT","active":true,"required":false,"description":"PROPERTY_TAX_RECIEPT_DESCRIPTION"}]
    documents = documents.filter(item => {
        return item.active;
    });
    let documentsContract = [];
    let tempDoc = {};
    documents.forEach(doc => {
        let card = {};
        card["code"] = doc.documentType;
        card["title"] = doc.documentType;
        card["cards"] = [];
        tempDoc[doc.documentType] = card;
    });
  
    documents.forEach(doc => {
        // Handle the case for multiple muildings
        let card = {};
        card["name"] = doc.code;
        card["code"] = doc.code;
        card["required"] = doc.required ? true : false;
        if (doc.hasDropdown && doc.dropdownData) {
            let dropdown = {};
            dropdown.label = "WS_SELECT_DOC_DD_LABEL";
            dropdown.required = true;
            dropdown.menu = doc.dropdownData.filter(item => {
                return item.active;
            });
            dropdown.menu = dropdown.menu.map(item => {
                return { code: item.code, label: getTransformedLocale(item.code) };
            });
            card["dropdown"] = dropdown;
        }
        tempDoc[doc.documentType].cards.push(card);
    });
  
    Object.keys(tempDoc).forEach(key => {
        documentsContract.push(tempDoc[key]);
    });
  
    store.dispatch(prepareFinalObject("documentsContractNOC", documentsContract));
  };

  componentDidMount = () => {
    this.prepareDocumentsUploadData("")
  };

  closeDialog = () => {
    store.dispatch(handleField(
        "search-preview",
        "components.div.children.newNoc.props",
        "open",
        false
      ))
  }

  setComments = (e) => {
    let stringArray = e.target.value.split(' ')
    if(stringArray.length <= 201){
      this.setState({
        comments:e.target.value
      })
    }else{
      store.dispatch(
        toggleSnackbar(
          true,
          {
            labelName: "ERR_FILL_TWOHUNDRED_WORDS",
            labelKey: "ERR_FILL_TWOHUNDRED_WORDS"
          },
          "warning"
        )
      );
    }
  }

  render() {
    let { open } = this.props;
    const dropDownData = [
    {
        value: "Noc Type",
        label: "Noc Type"
    }]

    return (
      <Dialog
      fullScreen={false}
      open={open}
      onClose={this.closeDialog}
      maxWidth={false}
    >
      <DialogContent
        children={
          <Container
            children={
              <Grid
                container="true"
                style={{
                  height:'400px'
                }}
                spacing={12}
                marginTop={16}
                className="action-container">
                <Grid
                  style={{
                    alignItems: "center",
                    display: "flex"
                  }}
                  item
                  sm={10}>
                  <Typography component="h2" variant="subheading">
                    <LabelContainer labelName="NOC Details"
                    labelKey="NOC Details" />
                  </Typography>
                </Grid>
                <Grid
                  item
                  sm={2}
                  style={{
                    textAlign: "right",
                    cursor: "pointer",
                    position: "absolute",
                    right: "16px",
                    top: "16px"
                  }}
                  onClick={this.closeDialog}
                >
                  <CloseIcon />
                </Grid>
                  <Grid
                    item
                    sm={12}
                    style={{
                      marginTop: 12
                    }}>
                  <TextFieldContainer
                        select={true}
                        style={{ marginRight: "15px" }}
                        label={fieldConfig.nocType.label}
                        placeholder={fieldConfig.nocType.placeholder}
                        data={dropDownData}
                        optionValue="value"
                        optionLabel="label"
                        hasLocalization={false}
                        //onChange={e => this.onEmployeeClick(e)}
                        onChange={e =>
                          store.dispatch(prepareFinalObject(
                            "mynocType",
                            e.target.value
                          ))
                        }
                        jsonPath={'mynocType'}
                      />
                  </Grid>
                  <Grid item sm={12}>
                  <Typography component="h2">
                    <LabelContainer labelName="Required Documents"
                    labelKey="BPA_DOCUMENT_DETAILS_HEADER" />
                  </Typography>
                  </Grid>
                  <Grid item sm={12}>
                      <DocumentListContainer
                        buttonLabel = {{
                          labelName: "UPLOAD FILE",
                          labelKey: "BPA_BUTTON_UPLOAD FILE"
                        }}
                        description = {{
                          labelName: "Only .jpg and .pdf files. 6MB max file size.",
                          labelKey: "BPA_UPLOAD_FILE_RESTRICTIONS"
                        }}
                        inputProps = {{
                          accept: "image/*, .pdf, .png, .jpeg"
                        }}
                        documentTypePrefix = "BPA_"
                        maxFileSize = {5000}>
                      </DocumentListContainer>
                  </Grid>
                <Grid item sm={12}
                 style={{
                  marginTop: 8,
                  textAlign: "right",
                  marginBottom:10
                }}>
                  {/* <Button
                    variant={"contained"}
                    color={"primary"}
                    onClick={this.resetMessage}
                    style={{
                      marginRight:'4px'
                    }}
                    >
                    <LabelContainer
                      labelName={"BPA_RESET_BUTTON"}
                      labelKey=
                      {"BPA_RESET_BUTTON"}     
                    />
                    </Button> */}
                    <Button
                      variant={"contained"}
                      color={"primary"}
                      onClick={this.saveDetails}
                    >
                      <LabelContainer
                        labelName={"BPA_ADD_BUTTON"}
                        labelKey=
                          {"BPA_ADD_BUTTON"}     
                      />
                    </Button>
                </Grid>
              </Grid>
            }
            
          />
        }
      />
    </Dialog>
    ) 
  }
}

const mapStateToProps = (state) => {
  const { form,screenConfiguration } = state;
  const {preparedFinalObject} = screenConfiguration
  return { form,preparedFinalObject };
};

const mapDispatchToProps = (dispatch) => {
  return {
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NewNocContainer);
