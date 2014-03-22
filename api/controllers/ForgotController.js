/**
 * ForgotController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

var mailer = require("nodemailer");

module.exports = {

    index: function (req, res) {
        res.view('user/forgot_password', { error: null, success: null });
    },
    confirm: function (req, res) {
        var email = req.param("inputEmail");
        
        var displayStrings = new Object;
        displayStrings["InvalidEmail"] = "L'email renseigné n'est pas valide.";
        displayStrings["CannotMail"] = "Le serveur n'a pas été en mesure de vous renvoyer un mot de passe. Veuillez réessayer ultérieurement.";
        displayStrings["Success"] = "Un nouveau mot de passe vous a été envoyé par mail.";

        if (email && email.length > 1)
        {
            Carrotmobber.findOne({ email: email }).done(function(err, user) {
                if (!user || !user.registered) {
                    res.view('user/forgot_password', { error: displayStrings["InvalidEmail"], success: null });
                    return;
                }

                var password = Math.random().toString(36).slice(-8);

                var smtpTransport = mailer.createTransport("SMTP", {
                    host: "localhost",
                    port: 25
                });

                var mail = {
                    from: "Carrotmob <noreply@carrotmob.fr>",
                    to: email,
                    subject: "Vos identifiants Carrotmob",
                    html: "<!DOCTYPE html PUBLIC \"-//W3C//DTD XHTML 1.0 Transitional//EN\" \"http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd\"> \
<html xmlns=\"http://www.w3.org/1999/xhtml\"> \
    <head> \
        <meta http-equiv=\"Content-Type\" content=\"text/html; charset=UTF-8\"> \
        <title>*|MC:SUBJECT|*</title> \
		 \
    <style type=\"text/css\"> \
		#outlook a{ \
			padding:0; \
		} \
		.ReadMsgBody{ \
			width:100%; \
		} \
		.ExternalClass{ \
			width:100%; \
		} \
		body{ \
			margin:0; \
			padding:0; \
		} \
		img{ \
			border:0; \
			height:auto; \
			line-height:100%; \
			outline:none; \
			text-decoration:none; \
		} \
		table,td{ \
			border-collapse:collapse; \
			mso-table-lspace:0pt; \
			mso-table-rspace:0pt; \
		} \
		#bodyTable{ \
			height:100% !important; \
			margin:0; \
			padding:0; \
			width:100% !important; \
		} \
	/* \
	@tab Page \
	@section heading 1 \
	@tip Set the styling for all first-level headings in your emails. These should be the largest of your headings. \
	@style heading 1 \
	*/ \
		h1{ \
			/*@editable*/color:#202020; \
			display:block; \
			/*@editable*/font-family:Helvetica; \
			/*@editable*/font-size:26px; \
			/*@editable*/font-style:normal; \
			/*@editable*/font-weight:bold; \
			/*@editable*/line-height:100%; \
			/*@editable*/letter-spacing:normal; \
			margin-top:0; \
			margin-right:0; \
			margin-bottom:10px; \
			margin-left:0; \
			/*@editable*/text-align:left; \
		} \
	/* \
	@tab Page \
	@section heading 2 \
	@tip Set the styling for all second-level headings in your emails. \
	@style heading 2 \
	*/ \
		h2{ \
			/*@editable*/color:#404040; \
			display:block; \
			/*@editable*/font-family:Helvetica; \
			/*@editable*/font-size:20px; \
			/*@editable*/font-style:normal; \
			/*@editable*/font-weight:bold; \
			/*@editable*/line-height:100%; \
			/*@editable*/letter-spacing:normal; \
			margin-top:0; \
			margin-right:0; \
			margin-bottom:10px; \
			margin-left:0; \
			/*@editable*/text-align:left; \
		} \
	/* \
	@tab Page \
	@section heading 3 \
	@tip Set the styling for all third-level headings in your emails. \
	@style heading 3 \
	*/ \
		h3{ \
			/*@editable*/color:#606060; \
			display:block; \
			/*@editable*/font-family:Helvetica; \
			/*@editable*/font-size:16px; \
			/*@editable*/font-style:normal; \
			/*@editable*/font-weight:bold; \
			/*@editable*/line-height:100%; \
			/*@editable*/letter-spacing:normal; \
			margin-top:0; \
			margin-right:0; \
			margin-bottom:10px; \
			margin-left:0; \
			/*@editable*/text-align:left; \
		} \
	/* \
	@tab Page \
	@section heading 4 \
	@tip Set the styling for all fourth-level headings in your emails. These should be the smallest of your headings. \
	@style heading 4 \
	*/ \
		h4{ \
			/*@editable*/color:#808080; \
			display:block; \
			/*@editable*/font-family:Helvetica; \
			/*@editable*/font-size:12px; \
			/*@editable*/font-style:normal; \
			/*@editable*/font-weight:bold; \
			/*@editable*/line-height:100%; \
			/*@editable*/letter-spacing:normal; \
			margin-top:0; \
			margin-right:0; \
			margin-bottom:10px; \
			margin-left:0; \
			/*@editable*/text-align:left; \
		} \
	/* \
	@tab Header \
	@section preheader style \
	@tip Set the background color and bottom border for your email's preheader area. \
	@theme page \
	*/ \
		#templatePreheader{ \
			/*@editable*/background-color:#fc9b51; \
			/*@editable*/border-bottom:0; \
		} \
	/* \
	@tab Header \
	@section preheader text \
	@tip Set the styling for your email's preheader text. Choose a size and color that is easy to read. \
	*/ \
		.preheaderContent{ \
			/*@editable*/color:#FFFFFF; \
			/*@editable*/font-family:Helvetica; \
			/*@editable*/font-size:10px; \
			/*@editable*/line-height:125%; \
			/*@editable*/text-align:left; \
		} \
	/* \
	@tab Header \
	@section preheader link \
	@tip Set the styling for your email's preheader links. Choose a color that helps them stand out from your text. \
	*/ \
		.preheaderContent a:link,.preheaderContent a:visited,.preheaderContent a .yshortcuts { \
			/*@editable*/color:#FFFFFF; \
			/*@editable*/font-weight:normal; \
			/*@editable*/text-decoration:underline; \
		} \
	/* \
	@tab Header \
	@section header style \
	@tip Set the background color and border for your email's header area. \
	@theme header \
	*/ \
		#templateHeader{ \
			/*@editable*/background-color:#FFFFFF; \
			/*@editable*/border-top:0; \
			/*@editable*/border-bottom:0; \
		} \
	/* \
	@tab Header \
	@section header text \
	@tip Set the styling for your email's header text. Choose a size and color that is easy to read. \
	*/ \
		.headerContent{ \
			/*@editable*/color:#505050; \
			/*@editable*/font-family:Helvetica; \
			/*@editable*/font-size:20px; \
			/*@editable*/font-weight:bold; \
			/*@editable*/line-height:100%; \
			/*@editable*/padding-top:20px; \
			/*@editable*/padding-right:0; \
			/*@editable*/padding-bottom:20px; \
			/*@editable*/padding-left:0; \
			/*@editable*/text-align:left; \
			/*@editable*/vertical-align:middle; \
		} \
	/* \
	@tab Header \
	@section header link \
	@tip Set the styling for your email's header links. Choose a color that helps them stand out from your text. \
	*/ \
		.headerContent a:link,.headerContent a:visited,.headerContent a .yshortcuts { \
			/*@editable*/color:#26ABE2; \
			/*@editable*/font-weight:normal; \
			/*@editable*/text-decoration:underline; \
		} \
	/* \
	@tab Body \
	@section body style \
	@tip Set the background color for your email's body area. \
	*/ \
		#templateBody{ \
			/*@editable*/background-color:#FFFFFF; \
			/*@editable*/border-top:0; \
			/*@editable*/border-bottom:0; \
			padding:20px; \
		} \
	/* \
	@tab Body \
	@section body text \
	@tip Set the styling for your email's main content text. Choose a size and color that is easy to read. \
	@theme main \
	*/ \
		.bodyContent{ \
			/*@editable*/color:#505050; \
			/*@editable*/font-family:Helvetica; \
			/*@editable*/font-size:13px; \
			/*@editable*/line-height:150%; \
			/*@editable*/text-align:left; \
		} \
	/* \
	@tab Body \
	@section body link \
	@tip Set the styling for your email's main content links. Choose a color that helps them stand out from your text. \
	*/ \
		.bodyContent a:link,.bodyContent a:visited,.bodyContent a .yshortcuts { \
			/*@editable*/color:#26ABE2; \
			/*@editable*/font-weight:normal; \
			/*@editable*/text-decoration:underline; \
		} \
		.bodyContent img{ \
			display:inline; \
			height:auto; \
			max-width:600px; \
		} \
	/* \
	@tab Footer \
	@section footer style \
	@tip Set the top border for your email's footer area. \
	@theme footer \
	*/ \
		#templateFooter{ \
			/*@editable*/border-top:0; \
			padding:20px; \
		} \
	/* \
	@tab Footer \
	@section footer style \
	@tip Set the top border for your email's footer area. \
	@theme footer \
	*/ \
		body,#bodyTable{ \
			/*@editable*/background-color:#F4F4F4; \
		} \
	/* \
	@tab Footer \
	@section footer text \
	@tip Set the styling for your email's footer text. Choose a size and color that is easy to read. \
	@theme footer \
	*/ \
		.footerContent{ \
			/*@editable*/color:#808080; \
			/*@editable*/font-family:Helvetica; \
			/*@editable*/font-size:10px; \
			/*@editable*/line-height:150%; \
			/*@editable*/text-align:left; \
		} \
	/* \
	@tab Footer \
	@section footer link \
	@tip Set the styling for your email's footer links. Choose a color that helps them stand out from your text. \
	*/ \
		.footerContent a:link,.footerContent a:visited,.footerContent a .yshortcuts { \
			/*@editable*/color:#606060; \
			/*@editable*/font-weight:normal; \
			/*@editable*/text-decoration:underline; \
		} \
		.footerContent img{ \
			display:inline; \
		} \
	@media only screen and (max-width: 480px){ \
		body,table,td,p,a,li,blockquote{ \
			-webkit-text-size-adjust:none !important; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
		body{ \
			width:100% !important; \
			min-width:100% !important; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
		td[id=templateBody],td[id=templateFooter]{ \
			padding-right:10px !important; \
			padding-left:10px !important; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
	/* \
	@tab Mobile Styles \
	@section template width \
	@tip Make the template fluid for portrait or landscape view adaptability. If a fluid layout doesn't work, set width to 300px instead. \
	*/ \
		table[class=templateContainer]{ \
			/*@tab Mobile Styles \
@section template width \
@tip Make the template fluid for portrait or landscape view adaptability. If a fluid layout doesn't work, set width to 300px instead.*/max-width:600px !important; \
			/*@editable*/width:100% !important; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
		table[id=templatePreheader]{ \
			display:none; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
	/* \
	@tab Mobile Styles \
	@section heading 1 \
	@tip Make the first-level headings larger in size for better readability on small screens. \
	*/ \
		h1{ \
			/*@editable*/font-size:28px !important; \
			/*@editable*/line-height:100% !important; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
	/* \
	@tab Mobile Styles \
	@section heading 2 \
	@tip Make the second-level headings larger in size for better readability on small screens. \
	*/ \
		h2{ \
			/*@editable*/font-size:24px !important; \
			/*@editable*/line-height:100% !important; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
	/* \
	@tab Mobile Styles \
	@section heading 3 \
	@tip Make the third-level headings larger in size for better readability on small screens. \
	*/ \
		h3{ \
			/*@editable*/font-size:20px !important; \
			/*@editable*/line-height:100% !important; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
	/* \
	@tab Mobile Styles \
	@section heading 4 \
	@tip Make the fourth-level headings larger in size for better readability on small screens. \
	*/ \
		h4{ \
			/*@editable*/font-size:16px !important; \
			/*@editable*/line-height:100% !important; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
	/* \
	@tab Mobile Styles \
	@section header image \
	@tip Make the main header image fluid for portrait or landscape view adaptability. If a fluid layout doesn't work, set width to 300px or half-size instead. \
	*/ \
		img[id=headerImage]{ \
			/*@tab Mobile Styles \
@section header image \
@tip Make the main header image fluid for portrait or landscape view adaptability. If a fluid layout doesn't work, set width to 300px or half-size instead.*/height:auto !important; \
			/*@editable*/max-width:233px !important; \
			/*@editable*/width:100% !important; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
	/* \
	@tab Mobile Styles \
	@section header text \
	@tip Make the header content text larger in size for better readability on small screens. \
	*/ \
		.headerContent{ \
			/*@editable*/font-size:21px !important; \
			/*@editable*/line-height:150% !important; \
			/*@editable*/padding-top:20px !important; \
			/*@editable*/padding-right:10px !important; \
			/*@editable*/padding-bottom:20px !important; \
			/*@editable*/padding-left:10px !important; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
	/* \
	@tab Mobile Styles \
	@section body text \
	@tip Make the body content text larger in size for better readability on small screens. \
	*/ \
		.bodyContent{ \
			/*@editable*/font-size:17px !important; \
			/*@editable*/line-height:150% !important; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
	/* \
	@tab Mobile Styles \
	@section footer text \
	@tip Make the footer content text larger in size for better readability on small screens. \
	*/ \
		.footerContent{ \
			/*@editable*/font-size:13px !important; \
			/*@editable*/line-height:150% !important; \
		} \
 \
}	@media only screen and (max-width: 480px){ \
		td[class=footerContent] a{ \
			display:block !important; \
		} \
 \
}</style></head> \
    <body leftmargin=\"0\" marginwidth=\"0\" topmargin=\"0\" marginheight=\"0\" offset=\"0\"> \
    	<center> \
        	<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" height=\"100%\" width=\"100%\" id=\"bodyTable\"> \
            	<tr> \
                	<td align=\"center\" valign=\"top\"> \
                    	<!-- // BEGIN PREHEADER --> \
                        <table border=\"0\" cellpadding=\"10\" cellspacing=\"0\" width=\"100%\" id=\"templatePreheader\"> \
                        	<tr> \
                            	<td align=\"center\" valign=\"top\"> \
                                	<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\"> \
                                    	<tr> \
                                        	<td valign=\"top\" class=\"preheaderContent\" mc:edit=\"preheader_content\"><h1 class=\"mc-toc-title\" style=\"text-align: left;\"><img alt=\"\" border=\"0\" height=\"\" id=\"headerImage\" src=\"https://gallery.mailchimp.com/b0de5e5c1792b9eb039451ec2/images/logo_email.1.png\" style=\"border-style: none; margin: 0px; padding: 0px; max-width: 600px;\" width=\"\"><span style=\"color:#FFFFFF\">&nbsp;<span style=\"font-size:32px\"></span></span></h1> \
											</td> \
											<!-- *|END:IF|* --> \
                                        </tr> \
                                    </table> \
                                </td> \
                            </tr> \
                        </table> \
                        <!-- END PREHEADER \\ --> \
                    	<!-- // BEGIN TEMPLATE SECTIONS --> \
                        <table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> \
                        	<tr> \
                            	<td align=\"center\" valign=\"top\"> \
                                	<!-- // BEGIN HEADER --> \
                                    <!-- END HEADER \\ --> \
                                </td> \
                            </tr> \
                        	<tr> \
                            	<td align=\"center\" valign=\"top\"> \
                                	<!-- // BEGIN BODY --> \
                                	<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> \
                                    	<tr> \
                                        	<td align=\"center\" valign=\"top\" id=\"templateBody\"> \
                                            	<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" class=\"templateContainer\"> \
                                                	<tr> \
                                                        <td valign=\"top\" class=\"bodyContent\" mc:edit=\"body_content\"><div style=\"text-align: justify; \"><br> \
&nbsp;</div> \
 \
<div style=\"text-align: justify;\"><span style=\"font-size:12px\"><span style=\"color:rgb(51, 51, 51); font-family:lucida grande,tahoma,verdana,arial,sans-serif; line-height:18px\"><strong>Bonjour,<br><br>Vous avez oubli&eacute; votre mot de passe. Voici vos nouveaux identifiants;</strong></span><br style=\"color: rgb(51, 51, 51); font-family: 'lucida grande', tahoma, verdana, arial, sans-serif; line-height: 18px;\"> \
<span style=\"color:rgb(51, 51, 51); font-family:lucida grande,tahoma,verdana,arial,sans-serif; line-height:18px\"><br>Email : " + email + "<br> Mot de passe : " + password + "</span><br><br><span style=\"color:rgb(51, 51, 51); font-family:lucida grande,tahoma,verdana,arial,sans-serif; line-height:18px; text-align:justify\"><strong>Durablement,</strong></span><span style=\"color:rgb(51, 51, 51); font-family:lucida grande,tahoma,verdana,arial,sans-serif; line-height:18px\"><br><strong>L&#39;Equipe Carrotmob</strong></span></span></div>                                    <!-- END BODY \\ --> \
                                </td> \
                            </tr> \
                        	<tr> \
                            	<td align=\"center\" valign=\"top\"> \
                                	<!-- // BEGIN FOOTER --> \
                                	<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"100%\"> \
                                    	<tr> \
                                        	<td align=\"center\" valign=\"top\" id=\"templateFooter\" style=\"padding-bottom:40px;\"> \
                                            	<table border=\"0\" cellpadding=\"0\" cellspacing=\"0\" width=\"600\" class=\"templateContainer\"> \
                                                    <tr> \
                                                    	<td colspan=\"3\" valign=\"top\" class=\"footerContent\" mc:edit=\"footer_social\"><div style=\"text-align: center; \"><strong style=\"text-align:center\"><span class=\"text_exposed_show\" style=\"display:inline\"><a href=\"http://www.carrotmob.fr\" target=\"_self\"><span style=\"color:rgb(255, 140, 0)\"><span style=\"font-size:18px\">www.carrotmob.fr</span></span></a></span></strong><br> \
<br> \
<a href=\"https://twitter.com/CarrotCommunity\" target=\"_blank\"><img align=\"none\" alt=\"Twitter carrotcommunity\" height=\"65\" src=\"http://gallery.mailchimp.com/b0de5e5c1792b9eb039451ec2/images/icon_twitter.6_copie.png\" style=\"width: 65px; height: 65px; \" width=\"65\"></a><a href=\"https://www.facebook.com/571790206236153\" target=\"_blank\"><img align=\"none\" alt=\"facebook carrotmob france\" height=\"65\" src=\"http://gallery.mailchimp.com/b0de5e5c1792b9eb039451ec2/images/icon_facebook.6_copie.png\" style=\"width: 65px; height: 65px; \" width=\"65\"></a></div> \
</td> \
                                                    </tr> \
                                                	<tr> \
                                                        <td valign=\"top\" class=\"footerContent\" style=\"padding-top:20px; padding-bottom:20px;\" mc:edit=\"footer_content\"></td> \
                                                    </tr> \
                                                    <tr> \
                                                    	<td colspan=\"3\" valign=\"top\" class=\"footerContent\" mc:edit=\"footer_utility\"></td> \
                                                    </tr> \
                                                </table> \
                                            </td> \
                                        </tr> \
                                    </table> \
                                    <!-- END FOOTER \\ --> \
                                </td> \
                            </tr> \
                        </table> \
                        <!-- END TEMPLATE SECTIONS \\ --> \
                    </td> \
                </tr> \
            </table> \
        </center> \
    </body> \
</html>",
                    text: ""
                }

                smtpTransport.sendMail(mail, function(error, response) {
                    if (error)
                        res.view('user/forgot_password', { error: displayStrings["CannotMail"], success: null });
                    else {
                        user.password = password;
                        user.save(function(err, user) {});
                        res.view('user/forgot_password', { error: null, success: displayStrings["Success"] });
                    }
                    smtpTransport.close();
                });
            });

            return;
        }

        res.view('user/forgot_password', { error: displayStrings["InvalidEmail"], success: null });
    },

    /**
    * Overrides for the settings in `config/controllers.js`
    * (specific to ForgotController)
    */
    _config: {}
  
};
