package com.example.addressapi;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.Map;

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

    @GetMapping("/address/{cep}")
    public ResponseEntity<Address> findByCep(@PathVariable String cep) {
        return addresses.stream()
                .filter(a -> a.getCep().equals(cep))
                .findFirst()
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PutMapping("/address/{cep}")
    public ResponseEntity<Address> updateAddress(@PathVariable String cep, @RequestBody Address data) {
        for (Address a : addresses) {
            if (a.getCep().equals(cep)) {
                a.setRua(data.getRua());
                a.setBairro(data.getBairro());
                a.setCidade(data.getCidade());
                return ResponseEntity.ok(a);
            }
        }
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/address/cidade/{cidade}")
    public List<Address> findByCidade(@PathVariable String cidade) {
        return addresses.stream()
                .filter(a -> a.getCidade().equalsIgnoreCase(cidade))
                .toList();
    }

    @GetMapping("/address/count")
    public Map<String, Integer> count() {
        return Map.of("total", addresses.size());
    }

    @DeleteMapping("/address/{cep}")
    public ResponseEntity<Void> deleteAddress(@PathVariable String cep) {
        boolean removed = addresses.removeIf(a -> a.getCep().equals(cep));
        return removed
                ? ResponseEntity.noContent().build()
                : ResponseEntity.notFound().build();
    }
}