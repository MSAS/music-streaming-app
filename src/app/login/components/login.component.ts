import { Component, ElementRef, ViewChild, OnInit, ViewContainerRef, InjectionToken, OnChanges, EventEmitter, Output } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router"
import { alert, prompt, confirm, PromptOptions, PromptResult, inputType } from "tns-core-modules/ui/dialogs/dialogs";
import { Page } from "tns-core-modules/ui/page/page";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { TextField } from "tns-core-modules/ui/text-field";
import { User } from "~/app/models/user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Values } from "~/app/values/values";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { UserService } from "~/app/services/user.service";

@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css'],
})

export class LoginComponent {
    // @Output() model: EventEmitter<User> = new EventEmitter();

    transitions = ["explode", "fade", "flip", "flipLeft", "slide", "slideRight", "slideTop", "slideBottom"];
    btnEmployeeStyle = 'btn-employee';
    btnStudentStyle = 'btn-student';
    inputStyle = 'inputInactive';
    btnSelection = null;
    http: HttpClient;
    textfieldData: string;
    textfield: TextField;
    url: string;
    labelClass;
    forgot_password: boolean;
    emailTerm: string;
    emailTerm2: string;

    userNameText: string = "";
    passwordText: string = "";
    emailText: string = "";

    userNameIcon: string;
    passwordIcon: string;
    emailIcon: string;

    user: User;
    loggedIn: boolean;
    res: any;

    underlineUserName: string;
    underlinePassword: string;
    underlineEmail: string;

    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;

    result: string;
    isBusy: boolean = false;


    constructor(private page: Page, private routerExtensions: RouterExtensions, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef, http: HttpClient, private userService: UserService) {
        // this.page.actionBarHidden = true;
        this.http = http;

        this.user = new User();
        this.loggedIn = false;
        this.emailTerm = "Please enter the email you used to register. Check"
        this.emailTerm2 = "your email for the instructions to receive your password"

        this.userNameIcon = "res://icon_username"
        this.passwordIcon = "res://icon_password"
        this.emailIcon = "res://icon_email"

        this.underlineUserName = "#ffffff"
        this.underlinePassword = "#ffffff"
        this.underlineEmail = "#ffffff"
    }

    ngOnInit(): void {
        this.inputStyle = 'inputInactive';
        this.labelClass = "labels"
        this.forgot_password = false;
    }

    onFocusUserName() {
        this.userNameIcon = "res://icon_username_hover"
        this.underlineUserName = "#cc3333"
    }

    onBlurUserName() {
        this.userNameIcon = "res://icon_username"
        this.underlineUserName = "#ffffff"
    }

    public userNameTextField(args) {
        var textField = <TextField>args.object;
        this.userNameText = textField.text;
    }


    onFocusPassword() {
        this.passwordIcon = "res://icon_password_hover"
        this.underlinePassword = "#cc3333"
    }

    onBlurPassword() {
        this.passwordIcon = "res://icon_password"
        this.underlinePassword = "#ffffff"
    }

    public passwordTextField(args) {
        var textField = <TextField>args.object;
        this.passwordText = textField.text;
    }

    onFocusEmail() {
        this.emailIcon = "res://icon_email_hover"
        this.underlineEmail = "#cc3333"
    }

    onBlurEmail() {
        this.emailIcon = "res://icon_email"
        this.underlineEmail = "#ffffff"
    }

    public emailTextField(args) {
        var textField = <TextField>args.object;
        this.emailText = textField.text;
    }


    onLoginClick() {
        if (this.userNameText == "") {
            alert("Username can not be empty");
            return;
        }
        if (this.passwordText == "") {
            alert("Passsword can not be empty");
        }

        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music"
        });

        this.user.code = this.userNameText;
        this.user.password = this.passwordText;

        this.http.post("http://ems-api-dev.m-sas.com/api/users/signIn", this.user, { headers: headers }).subscribe((res: any) => {

            if (res.isSuccess) {
                let result: any
                result = res.data
                this.res = result;
                for (var i = 0; i < result.roles.length; i++) {
                    if (result.roles[i] != undefined && result.roles[i].key != undefined && result.roles[i].key != "") {
                        Values.writeString(Values.X_ROLE_KEY, result.roles[i].key);
                        let extendedNavigationExtras: ExtendedNavigationExtras = {
                            queryParams: {
                                "user": result
                            }
                        };
                        this.userService.setUser(result, result.roles[i].key);
                        this.routerExtensions.navigate(["/home"], extendedNavigationExtras);
                    }
                    else {
                        alert("Authentication Problem (Could not get role key)");
                    }
                }
            }
            else {
                alert(res.error)
            }
        },
            error => {
                alert(error)
            })
    }

    forgotPasswordSubmit() {
        if (this.emailText == "") {
            alert("Email can not be empty");
            return;
        }

        // if (this.passwordText == "") {
        //     alert("Passsword can not be empty");
        // }

        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music"
        });

        this.user.email = this.emailText;
        // this.user.password = this.passwordText;

        this.http.post("http://ems-api-dev.m-sas.com/api/users/resend", this.user, { headers: headers }).subscribe((res: any) => {
            // console.log(res);
            // this.user = <User>res;

            if (res.isSuccess) {

                res.otp = "112233";
                res.password = "123456";

                // this.user = <User>res.data;
                // this.user.otp = "112233";
                // this.user.password = "123456";

                this.http.post("http://ems-api-dev.m-sas.com/api/users/setPassword/" + res.id, res, { headers: headers }).subscribe((res: any) => {
                    // console.log(res);

                    if (res.isSuccess) {

                        // this.user = <User>res.data;
                        for (var i = 0; i < res.roles.length; i++) {
                            if (res.roles[i] != undefined && res.roles[i].key != undefined && res.roles[i].key != "") {
                                Values.writeString(Values.X_ROLE_KEY, res.roles[i].key);
                            }
                        }
                        // this.model.emit(this.user);
                        this.userService.setUser(res, res.roles[i].key);
                        this.routerExtensions.navigate(["/home"]);
                    }
                    else {
                        alert("Authentication Problem (Could not get role key)");
                    }

                },
                    error => {
                        alert(error);
                    })
            }
            else {
                alert(res.error);
            }

        },
            error => {
                alert(error);
                // console.log(error);
            })
    }

    // onLoginClick() {
    //     var phoneCheck = /^[0-9]{10,10}$/;
    //     if (phoneCheck.test(this.textfieldData)) {
    //         alert("cbdbcbkd");
    //     }
    //     else {
    //         var toast = Toast.makeText("please enter correct phone number");
    //         toast.show();
    //     }
    // }

    nativegateBack(): void {
        this.routerExtensions.back();
    }

    navigateToRegister() {
        this.routerExtensions.navigate(["/register"]);
    }

    navigateToLogin() {
        this.routerExtensions.navigate(["/login"]);
    }

    nativateToForgotPassword() {
        this.forgot_password = true;
    }

    navigateFromForgotPassword() {
        this.forgot_password = false;
    }

    // forgotPasswordSubmit() {
    //     alert("nnrbjrbtlrtnbkljrnt")
    // }

}