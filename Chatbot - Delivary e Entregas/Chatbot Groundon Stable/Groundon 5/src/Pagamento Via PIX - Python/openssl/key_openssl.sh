To generate a private key and public certificate in .pem format, you can use the openssl tool as follows:

    Make sure you have openssl installed on your system. You can install it using the command:

sudo pacman -S openssl

    Generate a private key in .pem format:

openssl genrsa -out private.pem 2048

    Generate a certificate signing request (CSR) in .pem format:

openssl req -new -key private.pem -out csr.pem

    Generate a self-signed certificate in .pem format:

openssl x509 -req -days 365 -in csr.pem -signkey private.pem -out public.pem

The private key will be stored in private.pem, and the public certificate will be stored in public.pem.
