package com.bookstore.api.dto;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class BookRequest {
    @NotBlank(message = "Title is required")
    private String title;
    @NotBlank(message = "Author is required")
    private String author;
    @Min(value = 1, message = "Price must be greater than 0")
    private double price;
}
