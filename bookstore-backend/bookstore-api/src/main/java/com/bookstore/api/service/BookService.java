package com.bookstore.api.service;
import com.bookstore.api.dto.BookRequest;
import com.bookstore.api.model.Book;
import com.bookstore.api.repository.BookRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BookService {

    private final BookRepository bookRepository;

    public Book addBook(BookRequest request) {

        Book book = Book.builder()
                .title(request.getTitle())
                .author(request.getAuthor())
                .price(request.getPrice())
                .build();

        return bookRepository.save(book);
    }
    public Book updateBook(Long id, BookRequest request) {

        Book book = bookRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book not found"));

        book.setTitle(request.getTitle());
        book.setAuthor(request.getAuthor());
        book.setPrice(request.getPrice());

        return bookRepository.save(book);
    }
    public List<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public void deleteBook(Long id) {
        bookRepository.deleteById(id);
    }
}
