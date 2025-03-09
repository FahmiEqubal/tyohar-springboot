package com.tyohar.config;

import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public String handleException(HttpServletRequest request, Exception ex, RedirectAttributes redirectAttributes, HttpSession session) {
        // Log the exception
        ex.printStackTrace();

        // Store error message in session to display in UI
        session.setAttribute("errorMessage", "Something went wrong. Please try again.");

        if (request.getRequestURI().startsWith("/admin")) {
            return "redirect:/admin/";
        } else {
            return "redirect:/";
        }
    }
}
