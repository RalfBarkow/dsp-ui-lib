import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {
    ApiResponseData,
    ApiResponseError,
    KnoraApiConnection,
    ProjectResponse,
    ReadProject,
    ReadResource,
    ReadUser
} from '@dasch-swiss/dsp-js';
import { NotificationService } from '../../../../action/services/notification.service';
import { DspApiConnectionToken } from '../../../../core/core.module';
import { UserService } from '../../../services/user.service';

@Component({
    selector: 'dsp-property-toolbar',
    templateUrl: './property-toolbar.component.html',
    styleUrls: ['./property-toolbar.component.scss']
})
export class PropertyToolbarComponent implements OnInit {

    @Input() resource: ReadResource;

    @Input() showAllProps = false;

    @Output() toggleProps: EventEmitter<boolean> = new EventEmitter<boolean>();

    @Output() openProject: EventEmitter<ReadProject> = new EventEmitter<ReadProject>();

    project: ReadProject;
    user: ReadUser;

    constructor(
        @Inject(DspApiConnectionToken) private _dspApiConnection: KnoraApiConnection,
        private _notification: NotificationService,
        private _snackBar: MatSnackBar,
        private _userService: UserService
    ) { }

    ngOnInit() {
        // get project information
        this._dspApiConnection.admin.projectsEndpoint.getProjectByIri(this.resource.attachedToProject).subscribe(
            (response: ApiResponseData<ProjectResponse>) => {
                this.project = response.body.project;
            },
            (error: ApiResponseError) => {
                this._notification.openSnackBar(error);
            }
        );

        // get user information
        this._userService.getUser(this.resource.attachedToUser).subscribe(
            user => {
                this.user = user.user;
            }
        );
    }


    /**
     * Display message to confirm the copy of the citation link (ARK URL)
     */
    openSnackBar() {
        const message = 'Copied to clipboard!';
        const action = 'Citation Link';
        this._snackBar.open(message, action, {
            duration: 3000,
            horizontalPosition: 'center',
            verticalPosition: 'top'
        });
    }

}
