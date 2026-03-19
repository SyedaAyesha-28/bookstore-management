package com.bookstore.api.controller;
import jakarta.validation.Valid;
import com.bookstore.api.dto.BookRequest;
import com.bookstore.api.model.Book;
import com.bookstore.api.service.BookService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/books")
@RequiredArgsConstructor
public class BookController {

    private final BookService bookService;

    @PostMapping("/add")
    public Book addBook(@Valid @RequestBody BookRequest request) {
        return bookService.addBook(request);
    }
    @PutMapping("/update/{id}")
    public Book updateBook(@PathVariable Long id,
                           @RequestBody BookRequest request) {
        return bookService.updateBook(id, request);
    }
    @GetMapping("/all")
    public List<Book> getAllBooks() {
        System.out.println("GET ALL BOOKS API CALLED");
        return bookService.getAllBooks();
    }

    @DeleteMapping("/delete/{id}")
    public String deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return "Book deleted ✅";
    }

}
