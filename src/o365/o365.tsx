import "./o365.scss";
import {
    IWorkItemChangedArgs,
    IWorkItemFieldChangedArgs,
    IWorkItemFormService,
    IWorkItemLoadedArgs,
    WorkItemTrackingServiceIds
} from "azure-devops-extension-api/WorkItemTracking";
import * as SDK from "azure-devops-extension-sdk";
import { Button } from "azure-devops-ui/Button";
import * as React from "react";
import octicons from "typed-octicons";
import { showRootComponent } from "../Common";

interface WorkItemFormGroupComponentState {
    eventContent: string;
    args: string;
}

class WorkItemFormGroupComponent extends React.Component<{}, WorkItemFormGroupComponentState> {
    constructor(props: {}) {
        super(props);
        this.state = {
            eventContent: "",
            args: ""
        };
    }

    public componentDidMount() {
        SDK.init().then(() => {
            this.registerEvents();
        });
    }

    public render(): JSX.Element {
        if (this.state.args === undefined || this.state.args === "") {
            return(
                <div>No O365 document defined. Provide the link to the O365 document in the field "CosmoO365Link" if you want it to show up here.</div>
            );
        } else {
            var urlPart = this.state.args.substring(0, this.state.args.indexOf("&"))
            var embedUrl = urlPart + "&action=embedview&wdStartOn=1&wdEmbedCode=0"
            var editUrl = urlPart + "&action=edit"
            var svgLink = "&nbsp;<a href=\"" + editUrl + "\" target=\"_blank\" style=\"position:absolute;\">" + octicons.pencil.toSVG() + "</a>"
            document.getElementById("root")?.parentElement?.parentElement?.setAttribute("style", "height:95%;")
            var style= {
                height: '100%'
            }   
            return (
                <div style={style}>
                    <iframe src={embedUrl} frameBorder="0" width="99%" height="100%"></iframe>
                    <span dangerouslySetInnerHTML={{ __html: svgLink }} />
                </div>
                
            );
        }
    }

    private registerEvents() {
        SDK.register(SDK.getContributionId(), async () => {
            const workItemFormService = await SDK.getService<IWorkItemFormService>(
                WorkItemTrackingServiceIds.WorkItemFormService
            );
            return {// Called when a new work item is being loaded in the UI
                onLoaded: async (args: IWorkItemLoadedArgs) => {
                    let wtf = await workItemFormService.getFields();
                    this.setState({
                        eventContent: `onLoaded - ${JSON.stringify(args)}`,
                        args: (await workItemFormService.getFieldValue('CosmoO365Link')) as string
                    });
                }
            };
        });
    }
}

showRootComponent(<WorkItemFormGroupComponent />);
