import { Component, OnInit, inject, viewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatRadioModule } from "@angular/material/radio";
import { ReactiveValidationModule, Validators } from "angular-reactive-validation";
import { ClientsService } from "../../clients.service";
import Swal from "sweetalert2";
@Component({
    selector: 'app-client-form',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        MatButtonModule,
        MatInputModule,
        MatFormFieldModule,
        MatRadioModule,
        ReactiveValidationModule,
    ],
    templateUrl: './client-form.component.html',
    styles: ``,
})
export class ClientFormComponent implements OnInit {
    private activeRoute = inject(ActivatedRoute);
    private clientService = inject(ClientsService);
    public router = inject(Router);
    private formBuilder = inject(FormBuilder);

    clientForm!: FormGroup;
    isEditMode: boolean = false;

    ngOnInit(): void {
        this.isEditMode = this.router.url.includes('edit');
        this.initForm();

        if (this.isEditMode) {
            this.activeRoute.params.subscribe((params) => {
                const id = params['id'];
                this.retrieveClient(id);
            });
        }
    }

    initForm(): void {
        this.clientForm = this.formBuilder.group({
            identificacionComprador: ['', Validators.required('El identificador es requerido')],
            tipoIdentificacion: ['', Validators.required('El tipo de identificador es requerido')],
            razonSocialComprador: ['', Validators.required('La razon es requerido')],
            direccionComprador: ['', Validators.required('La direccion es requerido')],
            correo: [
                '',
                [
                    Validators.required('El correo es requerido'),
                    Validators.email('El correo no es valido'),
                ],
            ],
        })
    }

    private retrieveClient(id: number): void {
        this.clientService.getClientById(id).subscribe({
            next: (client) => {
                this.clientForm.patchValue(client);
            },
            error: () => {
                Swal.fire({
                    title: 'Error',
                    text: 'No se puede obtener el cliente',
                    icon: 'error',
                });
                this.router.navigate(['/clients'])
            },
        });
    }

    onUpdate(): void {
        const id = this.activeRoute.snapshot.params['id'];
        const client = this.clientForm.value;

        this.clientService.updateClient(id, client).subscribe({
            next: () => {
                this.router.navigate(['./dashboard/clients/clientList']);
                Swal.fire({
                    title: 'Cliente actualizado',
                    text: 'Cliente actualizado correctamente',
                    icon: 'success',
                });
            },
        });
    }

    onCreate(): void {
        if (this.clientForm.invalid) return;
        const client = this.clientForm.value;

        this.clientService.createClient(client).subscribe({
            next: () => {
                this.router.navigate(['./clients/clientList']);
                Swal.fire({
                    title: 'Cliente creado',
                    text: 'Cliente creado correctamente',
                    icon: 'success',
                });
            },
        });
    }
}