package com.example.demo;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@RestController
public class AddressController {

    private final List<Address> addresses = new ArrayList<>(
            Arrays.asList(
                    new Address("Floriano Peixoto", "38400100", "centro", "Urbelândia"),
                    new Address("Higor Paulo", "38400200", "Fundo", "Goiania"),
                    new Address("Peixoto", "38400300", "Ponta", "Distrito federal")
            )
    );

    @GetMapping("/address")
    public List<Address> getAddresses() {
        return this.addresses;
    }

    @PostMapping("/address")
    public void Addresses(@RequestBody Address address) {
        this.addresses.add(address);
    }
}
