import { Component, OnInit, ChangeDetectorRef, ViewChild, ElementRef, Output, EventEmitter } from "@angular/core";
import { Page } from "tns-core-modules/ui/page/page";
import { RouterExtensions } from "nativescript-angular/router";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { User } from "~/app/models/user";
import { Values } from "~/app/values/values";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { UserService } from "~/app/services/user.service";
import { ModalComponent } from "~/app/modal/modal.component";

@Component({
    moduleId: module.id,
    selector: "m-register",
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
    @Output() model: EventEmitter<User> = new EventEmitter();
    @ViewChild('otpDialog') otpModal: ModalComponent;

    transitions = ["explode", "fade", "flip", "flipLeft", "slide", "slideRight", "slideTop", "slideBottom"];
    btnEmployeeStyle = 'btn-employee';
    btnStudentStyle = 'btn-student';
    inputStyle = 'inputInactive';
    btnSelection = null;

    userNameText: string = "";
    emailText: string = "";
    passwordText: string = "";
    confirmPasswordText: string = "";

    userNameIcon: string;
    emailIcon: string;
    passwordIcon: string;
    confirmPasswordIcon: string;

    url: string;
    labelClass;
    username;

    user: User;
    loggedIn: boolean;
    res: User;

    underlineUserName: string;
    underlineEmail: string;
    underlinePassword: string;
    underlineConfirmPassword: string;
    otpText: string = '';

    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;

    isBusy: boolean = false;
    result;

    constructor(private page: Page, private routerExtensions: RouterExtensions, private http: HttpClient, private userService: UserService) {
        // this.page.actionBarHidden = true;

        this.user = new User();
        this.res = new User();
        this.loggedIn = false;
        this.userService.actionBarState(false)
        this.userService.homeSelector(false);

        this.userNameIcon = "res://icon_username"
        this.emailIcon = "res://icon_email"
        this.passwordIcon = "res://icon_password"
        this.confirmPasswordIcon = "res://icon_password"

        this.underlineUserName = "#ffffff"
        this.underlineEmail = "#ffffff"
        this.underlinePassword = "#ffffff"
        this.underlineConfirmPassword = "#ffffff"

    }

    ngOnInit(): void {
    }

    onFocusUserName() {
        this.userNameIcon = "res://icon_username_hover"
        this.underlineUserName = "#cc3333"
    }

    onBlurUserName() {
        this.userNameIcon = "res://icon_username"
        this.underlineUserName = "#ffffff"
    }

    onFocusEmail() {
        this.emailIcon = "res://icon_email_hover"
        this.underlineEmail = "#cc3333"
    }

    onBlurEmail() {
        this.emailIcon = "res://icon_email"
        this.underlineEmail = "#ffffff"
    }

    onFocusPassword() {
        this.passwordIcon = "res://icon_password_hover"
        this.underlinePassword = "#cc3333"
    }

    onBlurPassword() {
        this.passwordIcon = "res://icon_password"
        this.underlinePassword = "#ffffff"
    }

    onFocusConfirmPassword() {
        this.confirmPasswordIcon = "res://icon_password_hover"
        this.underlineConfirmPassword = "#cc3333"
    }

    onBlurConfirmPassword() {
        this.confirmPasswordIcon = "res://icon_password"
        this.underlineConfirmPassword = "#ffffff"
    }

    public userNameTextField(args) {
        var textField = <TextField>args.object;
        this.userNameText = textField.text;
    }

    public emailTextField(args) {
        var textField = <TextField>args.object;
        this.emailText = textField.text;
    }

    public passwordTextField(args) {
        var textField = <TextField>args.object;
        this.passwordText = textField.text;
    }

    public confirmPasswordTextField(args) {
        var textField = <TextField>args.object;
        this.confirmPasswordText = textField.text;
    }

    nativegateBack(): void {
        this.routerExtensions.back();
    }

    openOtpDialog() {
        this.otpModal.show();
    }

    closeOtpDialog() {
        this.otpModal.hide();
    }

    public otpTextField(args) {
        var textField = <TextField>args.object;
        this.otpText = textField.text;
    }

    onOtpSubmit() {
        if (this.otpText == "") {
            alert("OTP can not be empty")
            return;
        }

        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music"
        });
        this.result.otp = this.otpText;
        this.isBusy = true;

        // this.user = <User>response.data;
        // this.user.otp = "112233";
        this.http.post("http://ems-api-dev.m-sas.com/api/users/confirm", this.result, { headers: headers }).subscribe((response: any) => {

            if (response.isSuccess) {
                let result: any
                result = response.data

                this.closeOtpDialog();
                this.isBusy = false;
                // this.user = response.data;
                for (var i = 0; i < result.roles.length; i++) {
                    if (result.roles[i] != undefined && result.roles[i].key != undefined && result.roles[i].key != "") {
                        Values.writeString(Values.X_ROLE_KEY, result.roles[i].key);
                        let extendedNavigationExtras: ExtendedNavigationExtras = {
                            queryParams: {
                                "user": result
                            }
                        };
                        this.loggedIn = true;
                        // this.model.emit(this.user);
                        this.userService.setUser(result, result.roles[i].key);
                        // this.userService.homeSelector(true);
                        this.routerExtensions.navigate(["/home"], extendedNavigationExtras);
                    }
                    else {
                        alert("Authentication Problem (Could not get role key)");
                    }
                }
            }
            else {
                this.isBusy = false;
                alert(response.error)
            }
        },
            error => {
                this.isBusy = false;
                console.log(error)
                alert(error);
            })
    }


    // onLoginClick() {
    //     var phoneCheck = /^[0-9]{10,10}$/;
    //     if (phoneCheck.test(this.textfieldData)) {
    //         alert("cbdbcbkd");
    //     }
    //     else {
    //         // var toast = Toast.makeText("please enter correct phone number");
    //         // toast.show();
    //     }
    // }

    onSubmit() {
        var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

        this.user.code = this.userNameText;
        this.user.email = this.emailText;
        this.user.password = this.passwordText;


        if (this.user.code.length < 4) {
            alert("User name must contain at least 4 characters");
            return;
        }

        if (reg.test(this.user.email) == false) {
            alert("Invalid email");
            return;
        }

        if (this.passwordText != this.confirmPasswordText) {
            alert("Passwords do not match");
            return;
        }

        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music"
        });
        this.isBusy = true;

        this.http.post("http://ems-api-dev.m-sas.com/api/users/signUp", this.user, { headers: headers }).subscribe((response: any) => {
            // this.res = <User>response.data;
            // this.user = this.res;
            if (response.isSuccess) {

                this.isBusy = false;
                let result: any
                result = response.data
                this.result = result;
                this.openOtpDialog();

            }
            else {
                this.isBusy = false;
                alert(response.error);
            }

        }, error => {
            this.isBusy = false;
            alert(error);
        });
    }

}