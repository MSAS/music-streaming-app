import { Component, ElementRef, ViewChild, OnInit, ViewContainerRef, InjectionToken, OnChanges, EventEmitter, Output } from "@angular/core";
import { RouterExtensions } from "nativescript-angular/router"
import { alert, prompt, confirm, PromptOptions, PromptResult, inputType } from "tns-core-modules/ui/dialogs/dialogs";
import { ModalDialogService, ModalDialogOptions } from "nativescript-angular/modal-dialog";
import { TextField } from "tns-core-modules/ui/text-field";
import { User } from "~/app/models/user";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Values } from "~/app/values/values";
import { ExtendedNavigationExtras } from "nativescript-angular/router/router-extensions";
import { UserService } from "~/app/services/user.service";
import { ModalComponent } from "~/app/modal/modal.component";
import * as Toast from 'nativescript-toast';
// import * as Facebook from "nativescript-facebook";
import { TnsOAuthClient, ITnsOAuthTokenResult } from "nativescript-oauth2";

import { Page } from "tns-core-modules/ui/page/page";
import { topmost } from "tns-core-modules/ui/frame";
import { TnsOaProvider, TnsOaProviderOptionsFacebook, TnsOaProviderFacebook } from "nativescript-oauth2/providers/providers";
import { AuthService } from "~/app/services/auth.service";
import { Pic } from "~/app/models/pic";
import { Profile } from "~/app/models/profile";
import { request, getFile, getImage, getJSON, getString } from "tns-core-modules/http";



// function configureOAuthProviderFacebook(): TnsOaProvider {
//     const facebookProviderOptions: TnsOaProviderOptionsFacebook = {
//         openIdSupport: "oid-none",
//         clientId: "691208554415641",
//         clientSecret: "d8725ac416fa1bb1917ccffd1670e3c7",
//         redirectUri: "https://www.facebook.com/connect/login_success.html",
//         scopes: ["email"]
//     };
//     const facebookProvider = new TnsOaProviderFacebook(facebookProviderOptions);
//     return facebookProvider;
// }



@Component({
    selector: "app-login",
    moduleId: module.id,
    templateUrl: "./login.component.html",
    styleUrls: ['./login.component.css'],
})

export class LoginComponent {
    @ViewChild('otpDialog') otpModal: ModalComponent;
    @ViewChild('passwordDialog') passwordModal: ModalComponent;

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
    hide: boolean;
    emailTerm: string;
    emailTerm2: string;

    userNameText: string = "";
    passwordText: string = "";
    picUrl: string = "";
    emailText: string = "";
    otpText: string = "";
    newPasswordText: string = "";
    confirmNewPasswordText: string = "";

    userNameIcon: string;
    passwordIcon: string;
    emailIcon: string;

    user: User;
    userId: string;
    loggedIn: boolean;
    res: any;

    underlineUserName: string;
    underlinePassword: string;
    underlineEmail: string;
    FACEBOOK_GRAPH_API_URL: "https://graph.facebook.com/v2.9"

    @ViewChild("password") password: ElementRef;
    @ViewChild("confirmPassword") confirmPassword: ElementRef;

    result: string;
    isBusy: boolean = false;


    constructor(private page: Page, private routerExtensions: RouterExtensions, private modalService: ModalDialogService, private viewContainerRef: ViewContainerRef, http: HttpClient, private userService: UserService, private authService: AuthService) {
        // this.page.actionBarHidden = true;
        this.http = http;
        this.page.actionBarHidden = true;
        // this.onTapLogout();
        this.user = new User();
        this.loggedIn = false;
        this.userService.homeSelector(false);

        this.userService.actionBarState(false)

        this.emailTerm = "Please enter the email you used to register. Check"
        this.emailTerm2 = "your email for the instructions to receive your password"

        this.userNameIcon = "res://icon_username"
        this.passwordIcon = "res://icon_password"
        this.emailIcon = "res://icon_email"

        this.underlineUserName = "#ffffff"
        this.underlinePassword = "#ffffff"
        this.underlineEmail = "#ffffff"
    }




    // public onTapLogin() {
    //     const fram = topmost();

    //     this.authService
    //       .tnsOauthLogin("facebook")
    //       .then((result: ITnsOAuthTokenResult) => {
    //         console.log("back to app component with token" + result.accessToken);
    //       });
    //   }

    //   public onTapLogout() {
    //     this.authService.tnsOauthLogout();
    //   }




    ngOnInit(): void {
        this.inputStyle = 'inputInactive';
        this.labelClass = "labels"
        this.forgot_password = false;
    }








    public onTapLogin() {
        const fram = topmost();

        this.authService
            .tnsOauthLogin("facebook")
            .then((result: ITnsOAuthTokenResult) => {
                console.log("back to app component with token" + result.accessToken);
                Values.writeString(Values.FACEBOOK_ACCESS_TOKEN, result.accessToken)
                getJSON("https://graph.facebook.com/v2.9" + "/me?access_token=" + result.accessToken).then((res: any) => {
                    this.userNameText = res.name;
                    this.userId = res.id;
                    this.user = new User();
                    // this.user.code = this.userId;
                    this.user.facebookId = this.userId;
                    // this.userService.setUser(this.user, result.accessToken);
                    // Get logged in user's avatar
                    // ref: https://github.com/NativeScript/NativeScript/issues/2176
                    getJSON("https://graph.facebook.com/v2.9" + "/" + this.userId + "/picture?type=large&redirect=false&access_token=" + result.accessToken).then((res: any) => {
                        this.picUrl = res.data.url;
                        var name = this.userNameText.split(" ");
                        var lastName = '';
                        var firstName = '';
                        if (name != undefined && name != null) {
                            var len = name.length;
                            if (len - 1 != -1) {
                                if (len - 1 == 0) {
                                    firstName = name[len - 1]
                                }
                                else {
                                    for (var i = 0; i < len - 1; i++) {
                                        firstName = firstName + name[i];
                                    }
                                    lastName = name[len - 1];
                                }
                            }
                        }

                        var pic = new Pic();
                        pic.url = this.picUrl;
                        var profile = new Profile();
                        profile.firstName = firstName;
                        profile.lastName = lastName;
                        profile.pic = pic;



                        this.user.profile = profile;
                        // this.userService.setUser(this.user, result.accessToken);


                        let headers = new HttpHeaders({
                            "Content-Type": "application/json",
                            "x-tenant-code": "music"
                        });

                        this.http.post("http://ems-api-dev.m-sas.com/api/users/signUp", this.user, { headers: headers }).subscribe((response: any) => {
                            // this.res = <User>response.data;
                            // this.user = this.res;
                            if (response.isSuccess) {

                                let result: any
                                result = response.data


                                for (var i = 0; i < result.roles.length; i++) {
                                    if (result.roles[i] != undefined && result.roles[i].key != undefined && result.roles[i].key != "") {
                                        if (result.roles[i].isDefaultRole) {
                                            Values.writeString(Values.X_ROLE_KEY, result.roles[i].key);
                                            let extendedNavigationExtras: ExtendedNavigationExtras = {
                                                queryParams: {
                                                    "user": result
                                                }
                                            };
                                            this.userService.setUser(result, result.roles[i].key);
                                            // this.userService.homeSelector(true);
                                            this.routerExtensions.navigate(["/app"], extendedNavigationExtras);
                                        }
                                    }
                                    else {
                                        alert("Authentication Problem (Could not get role key)");
                                    }
                                }

                                // result.otp = "112233";

                                // this.user = <User>response.data;
                                // this.user.otp = "112233";
                                // this.http.post("http://ems-api-dev.m-sas.com/api/users/confirm", result, { headers: headers }).subscribe((response: any) => {

                                //     if (response.isSuccess) {
                                //         let result: any
                                //         result = response.data
                                //         // this.user = response.data;
                                //         for (var i = 0; i < result.roles.length; i++) {
                                //             if (result.roles[i] != undefined && result.roles[i].key != undefined && result.roles[i].key != "") {
                                //                 Values.writeString(Values.X_ROLE_KEY, result.roles[i].key);
                                //                 let extendedNavigationExtras: ExtendedNavigationExtras = {
                                //                     queryParams: {
                                //                         "user": result
                                //                     }
                                //                 };
                                //                 this.loggedIn = true;
                                //                 // this.model.emit(this.user);
                                //                 this.userService.setUser(result, result.roles[i].key);
                                //                 // this.userService.homeSelector(true);
                                //                 this.routerExtensions.navigate(["/home"], extendedNavigationExtras);
                                //             }
                                //             else {
                                //                 alert("Authentication Problem (Could not get role key)");
                                //             }
                                //         }
                                //     }
                                //     else {
                                //         alert(response.error)
                                //     }
                                // },
                                //     error => {
                                //         console.log(error)
                                //         alert(error);
                                //     })
                            }
                            else {
                                alert(response.error);
                            }

                        }, error => {
                            alert(error);
                        });

                        // this.ref.detectChanges();
                    }, function (err) {
                        alert("Error getting user info: " + err);
                    });
                }, function (err) {
                    alert("Error getting user info: " + err);
                });



            }).then(() => {
                this.routerExtensions.navigate(["/home"])
            });
        //   fram.navigate("/home")
        // this.authService.tnsOauthLogout();
    }

    public onTapLogout() {
        this.authService.tnsOauthLogout();
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


    public otpTextField(args) {
        var textField = <TextField>args.object;
        this.otpText = textField.text;
    }



    // onFocusNewPassword() {
    //     this.emailIcon = "res://icon_email_hover"
    //     this.underlineEmail = "#cc3333"
    // }

    // onBlurNewPassword() {
    //     this.emailIcon = "res://icon_email"
    //     this.underlineEmail = "#ffffff"
    // }

    public newPasswordTextField(args) {
        var textField = <TextField>args.object;
        this.newPasswordText = textField.text;
    }

    // onFocusConfirmNewPassword() {
    //     this.emailIcon = "res://icon_email_hover"
    //     this.underlineEmail = "#cc3333"
    // }

    // onBlurConfirmNewPassword() {
    //     this.emailIcon = "res://icon_email"
    //     this.underlineEmail = "#ffffff"
    // }

    public confirmNewPasswordTextField(args) {
        var textField = <TextField>args.object;
        this.confirmNewPasswordText = textField.text;
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

        this.isBusy = true;

        this.http.post("http://ems-api-dev.m-sas.com/api/users/signIn", this.user, { headers: headers }).subscribe((res: any) => {

            if (res.isSuccess) {
                let result: any
                result = res.data
                this.res = result;
                this.isBusy = false;
                for (var i = 0; i < result.roles.length; i++) {
                    if (result.roles[i] != undefined && result.roles[i].key != undefined && result.roles[i].key != "") {
                        if (result.roles[i].isDefaultRole) {
                            Values.writeString(Values.X_ROLE_KEY, result.roles[i].key);
                            let extendedNavigationExtras: ExtendedNavigationExtras = {
                                queryParams: {
                                    "user": result  
                                }
                            };
                            this.userService.setUser(result, result.roles[i].key);
                            // this.userService.homeSelector(true);
                            this.routerExtensions.navigate(["/home"], extendedNavigationExtras);
                        }
                    }
                    else {
                        alert("Authentication Problem (Could not get role key)");
                    }
                }
            }
            else {
                this.isBusy = false;

                alert(res.error)
            }
        },
            error => {
                this.isBusy = false;

                alert(error)
            })
    }



    // login() {
    //     Facebook.login((error, fbData) => {
    //         if (error) {
    //             alert("Error during login: " + error.message);
    //         } else {
    //             console.log(fbData.token);
    //         }
    //     });
    // }





    forgotPasswordSubmit() {

        this.hide = false;

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
                this.res = res;
                this.openOtpDialog();

                // this.user = <User>res.data;
                // this.user.otp = "112233";
                // this.user.password = "123456";

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



    onOtpSubmit() {

        if (this.otpText.length != 6) {
            alert("Please enter 6 digit OTP")
            return;
        }


        this.res.data.otp = this.otpText;
        // this.res.data.password = ;
        this.otpModal.hide();
        this.openPasswordDialog();



    }

    onPasswordSubmit() {

        if (this.newPasswordText != this.confirmNewPasswordText) {
            alert("Passwords do not match")
            return;
        }
        let headers = new HttpHeaders({
            "Content-Type": "application/json",
            "x-tenant-code": "music"
        });

        this.res.data.password = this.newPasswordText;
        this.isBusy=true;

        this.http.post("http://ems-api-dev.m-sas.com/api/users/setPassword/" + this.res.data.id, this.res.data, { headers: headers }).subscribe((res: any) => {
            // console.log(res);
            let result;
            if (res.isSuccess) {
                result = res.data;
                this.res = res;
                this.isBusy=false;
                this.passwordModal.hide();
                for (var i = 0; i < result.roles.length; i++) {
                    if (result.roles[i] != undefined && result.roles[i].key != undefined && result.roles[i].key != "") {
                        Values.writeString(Values.X_ROLE_KEY, result.roles[i].key);
                        let extendedNavigationExtras: ExtendedNavigationExtras = {
                            queryParams: {
                                "user": result
                            }
                        };
                        this.userService.setUser(result, result.roles[i].key);
                        this.userService.homeSelector(true);
                        this.routerExtensions.navigate(["/home"], extendedNavigationExtras);
                    }
                    else {
                        alert("Authentication Problem (Could not get role key)");
                    }
                }
            }
            else {
                this.isBusy=false;
                // alert(res.error);
            }

        },
            error => {
                this.isBusy=false;
                alert(error);
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

    // navigateToLogin() {
    //     this.routerExtensions.navigate(["/login"]);
    // }

    nativateToForgotPassword() {
        this.forgot_password = true;
        this.hide = true;
    }

    navigateFromForgotPassword() {
        this.forgot_password = false;
    }

    // forgotPasswordSubmit() {
    //     alert("nnrbjrbtlrtnbkljrnt")
    // }







    onTap() {
        alert("clicked an item");
    }


    openOtpDialog() {
        this.otpModal.show();
    }

    closeOtpDialog() {
        this.otpModal.hide();
    }

    openPasswordDialog() {
        this.passwordModal.show();
    }

    closePasswordDialog() {
        this.passwordModal.hide();
    }

    // openModal() {
    //     this.modal.show();
    // }

    // closeModal() {
    //     this.modal.hide();
    // }

    onOpenModal() {
        console.log("opened modal");
    }

    onCloseModal() {
        console.log("closed modal");
    }

}