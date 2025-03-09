package com.tyohar.util;

import java.io.UnsupportedEncodingException;
import java.security.Principal;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Component;

import com.tyohar.model.ProductOrder;
import com.tyohar.model.UserDtls;
import com.tyohar.service.UserService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import jakarta.servlet.http.HttpServletRequest;

@Component
public class CommonUtil {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private UserService userService;

    public Boolean sendMail(String url, String recipientEmail) throws UnsupportedEncodingException, MessagingException {

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("tyohargardengems@gmail.com", "Tyohar");
        helper.setTo(recipientEmail);

        String content = "<html><body>"
                + "<p>Dear Customer,</p>"
                + "<p>We have received your request to reset your password.</p>"
                + "<p>Please click the link below to create a new password:</p>"
                + "<p><a href=\"" + url + "\">Reset Password</a></p>"
                + "<p>This link will expire in 24 hours.</p>"
                + "<p>If you did not request a password reset, please ignore this email.</p>"
                + "<p>Sincerely,</p>"
                + "<p>The Tyohar Team</p>"
                + "</body></html>";

        helper.setSubject("Tyohar Password Reset");
        helper.setText(content, true);
        mailSender.send(message);
        return true;
    }

    public static String generateUrl(HttpServletRequest request) {
        String siteUrl = request.getRequestURL().toString();
        return siteUrl.replace(request.getServletPath(), "");
    }

    public Boolean sendMailForProductOrder(ProductOrder order, String status) throws Exception {

        String msg = "<html><body>"
                + "<p>Dear [[name]],</p>"
                + "<p>Thank you for your recent order from Tyohar! This email confirms that your order is now <b>[[orderStatus]]</b>.</p>"
                + "<h3>Order Details:</h3>"
                + "<p>Order ID: [[orderId]]</p>"
                + "<p>Order Date: [[orderDate]]</p>"
                + "<h3>Product Details:</h3>"
                + "<p>Name: [[productName]]</p>"
                + "<p>Category: [[category]]</p>"
                + "<p>Quantity: [[quantity]]</p>"
                + "<p>Price: [[price]]</p>"
                + "<p>Payment Type: [[paymentType]]</p>"
                + "<p>You can view your order details and track its shipment here: <a href=\"[[orderTrackingUrl]]\">[[orderTrackingUrl]]</a> (replace with actual order tracking URL)</p>" // Replace with your actual order tracking URL
                + "<p>If you have any questions, please don't hesitate to contact us at <a href=\"mailto:tyohargardengems@gmail.com\">tyohargardengems@gmail.com</a>.</p>"
                + "<p>Thank you for shopping with Tyohar!</p>"
                + "<p>Sincerely,</p>"
                + "<p>The Tyohar Team</p>"
                + "</body></html>";

        MimeMessage message = mailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message);

        helper.setFrom("tyohargardengems@gmail.com", "Tyohar");
        helper.setTo(order.getOrderAddress().getEmail());

        msg = msg.replace("[[name]]", order.getOrderAddress().getFirstName());
        msg = msg.replace("[[orderStatus]]", status);
        msg = msg.replace("[[orderId]]", order.getOrderId());
        msg = msg.replace("[[orderDate]]", new Date().toString()); // Format the date as needed
        msg = msg.replace("[[productName]]", order.getProduct().getTitle());
        msg = msg.replace("[[category]]", order.getProduct().getCategory());
        msg = msg.replace("[[quantity]]", order.getQuantity().toString());
        msg = msg.replace("[[price]]", order.getPrice().toString());
        msg = msg.replace("[[paymentType]]", order.getPaymentType());
        msg = msg.replace("[[orderTrackingUrl]]", "your-order-tracking-url/" + order.getOrderId()); // Replace with your actual order tracking URL

        helper.setSubject("Tyohar Order Update: " + status);
        helper.setText(msg, true);
        mailSender.send(message);
        return true;
    }

    public UserDtls getLoggedInUserDetails(Principal p) {
        String email = p.getName();
        UserDtls userDtls = userService.getUserByEmail(email);
        return userDtls;
    }
}