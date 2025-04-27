<template>
    <b-row>
        <b-col lg="12">
            <b-card>
                <div class="d-flex flex-wrap align-items-center justify-content-between">
                    <div class="d-flex flex-wrap align-items-center">
                        <div class="d-flex flex-wrap align-items-center mb-3 mb-sm-0">
                            <h4 class="me-2 h4">Sweet Alert</h4>
                        </div>
                    </div>
                    <small>For more Information regarding Sweet Alert Plugin refer
                        <a href="https://www.npmjs.com/package/vue-sweetalert2">Documentation</a>
                    </small>
                </div>
            </b-card>
        </b-col>
    </b-row>
    <b-row>
        <b-col lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">A Basic Message</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <p class="mb-5">
                        A short communication sent from one person to another or the central
                        theme or idea of a communication.
                    </p>
                    <div class="text-center">
                        <button class="btn btn-primary" @click="basicAlert">Try Me</button>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
        <b-col lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">Title with a Text</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <b-card-text class="mb-5">Image title text is an attribute used to provide additional
                        information about the image as well as displayed as a
                        tooltip.</b-card-text>
                    <div class="text-center">
                        <button class="btn btn-primary" @click="titleAlert">Try Me</button>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
        <b-col lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">A modal with a title and a footer</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <b-card-text class="mb-5">Modal-header class is used to define the style for the header of the modal
                        and footer define the style for the footer of the modal.</b-card-text>
                    <div class="text-center">
                        <button class="btn btn-primary" @click="modalAlert">Try Me</button>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
        <b-col lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">Custom positioned dialog</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <b-card-text class="mb-5">It set using the position property by providing custom X and Y coordinates
                        also positioned inside the target.</b-card-text>
                    <div class="text-center">
                        <button class="btn btn-primary" @click="custompostionedAlert">
                            Try Me
                        </button>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
        <b-col lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">A confirm dialog</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <b-card-text class="mb-5">Confirm dialog with a function attached to the "Confirm" -button and
                        specified message, along with an OK and a Cancel button.</b-card-text>
                    <div class="text-center">
                        <button class="btn btn-primary" @click="confirmAlert">Try Me</button>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
        <b-col lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">Message with a custom image</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <b-card-text class="mb-5">Custom images do not include the data from any attached block volumes. For
                        information about backing up volumes.</b-card-text>
                    <div class="text-center">
                        <button class="btn btn-primary" @click="customimageAlert">
                            Try Me
                        </button>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
        <b-col lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">Message with custom</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <b-card-text class="mb-5">A message with custom width, padding, background and animated Nyan
                        Cat.</b-card-text>
                    <div class="text-center">
                        <button class="btn btn-primary" @click="custommessageAlert">
                            Try Me
                        </button>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
        <b-col lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">ARIA labels</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <b-card-text class="mb-5">ARIA labels to create accessible element descriptions. ... if a button has
                        both text content and an aria-label.</b-card-text>
                    <div class="text-center">
                        <button class="btn btn-primary" @click="labelAlert">Try Me</button>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
        <b-col lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">A dialog with three buttons</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <b-card-text class="mb-5">There are three functions for adding Buttons to Android Dialog,
                        setPositiveButton(int textId, DialogInterface).</b-card-text>
                    <div class="text-center">
                        <button class="btn btn-primary" @click="multiplebuttonAlert">
                            Try Me
                        </button>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
        <b-col lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <h4 class="card-title">AJAX request example</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <b-card-text class="mb-5">The ajax() method in jQuery is used to perform an AJAX request or
                        asynchronous HTTP request.</b-card-text>
                    <div class="text-center">
                        <button class="btn btn-primary" @click="ajaxAlert">Try Me</button>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>
<script>
export default {
    name: "SweetAlert",

    methods: {
        basicAlert() {
            this.$swal({
                title: "Hello! This is a Basic Message.",
                backdrop: "rgba(60,60,60,0.8)",
            });
        },
        titleAlert() {
            this.$swal({
                title: "The Internet?",
                text: "That thing is still around? question",
                backdrop: "rgba(60,60,60,0.8)",
            });
        },
        modalAlert() {
            this.$swal({
                icon: "error",
                title: "Oops...",
                text: "Something went wrong!",
                backdrop: "rgba(60,60,60,0.8)",
                footer: '<a href="">Why do I have this issue?</a>',
                didOpen: () => {
                    document.querySelector('.swal2-footer').classList.add('custom-swal2-footer');
                }
            });
        },
        custompostionedAlert() {
            this.$swal({
                position: "top-end",
                icon: "success",
                backdrop: `
          rgba(60,60,60,0.8)`,
                title: "Your work has been saved",
                showConfirmButton: false,
                timer: 55000,
            });
        },
        confirmAlert() {
            this.$swal({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                backdrop: "rgba(60,60,60,0.8)",
                confirmButtonText: "Yes, delete it!",
                confirmButtonColor: "#c03221",
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal("Deleted!", "Your file has been deleted.", "success");
                }
            });
        },
        customimageAlert() {
            const generatePath = (path) => {
                return window.origin + import.meta.env.BASE_URL + path;
            };
            this.$swal({
                title: "Sweet!",
                text: "Modal with a custom image.",
                imageUrl: generatePath('/assets/images/pro/plugins/img2.jpg'),
                imageWidth: 400,
                imageHeight: 200,
                imageAlt: "Custom image",
                backdrop: "rgba(60,60,60,0.8)",
            });
        },
        custommessageAlert() {
            this.$swal({
                title: "Custom width, padding, background.",
                width: 600,
                padding: "3em",
                background: "#fff",
                backdrop: `rgba(60,60,60,0.8)
                url("../assets/images/pro/plugins/nyan-cat.gif")
                left top
                no-repeat`,
            });
        },
        labelAlert() {
            this.$swal({
                title: "<strong>HTML Example</strong>",
                icon: "info",
                html:
                    "You can use <b->bold text</b-card>, " +
                    '<a href="//sweetalert2.github.io">links</a> ' +
                    "and other HTML tags",
                backdrop: "rgba(60,60,60,0.8)",
                showCloseButton: true,
                showCancelButton: true,
                confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
                confirmButtonAriaLabel: "Thumbs up, great!",
                cancelButtonText: '<i class="fa fa-thumbs-down"></i> Cancel',
                cancelButtonAriaLabel: "Thumbs down, cancel!",
            });
        },
        multiplebuttonAlert() {
            this.$swal({
                title: "Do you want to save the changes?",
                showDenyButton: true,
                showCancelButton: true,
                confirmButtonText: "Save",
                denyButtonText: "Don't save",
                backdrop: `
    rgba(60,60,60,0.8)`,
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal("Saved!", "", "success");
                } else if (result.isDenied) {
                    this.$swal("Changes are not saved", "", "info");
                }
            });
        },
        ajaxAlert() {
            this.$swal({
                title: "Submit your Github username",
                input: "text",
                inputAttributes: {
                    autocapitalize: "off",
                },
                backdrop: "rgba(60,60,60,0.8)",
                confirmButtonText: "Look up",
                showCancelButton: true,
                showLoaderOnConfirm: true,
                preConfirm: (login) => {
                    return fetch(`//api.github.com/users/${login}`)
                        .then((response) => {
                            if (!response.ok) {
                                throw new Error(response.statusText);
                            }
                            return response.json();
                        })
                        .catch((error) => {
                            this.$swal.showValidationMessage(`Request failed: ${error}`);
                        });
                },
                allowOutsideClick: () => !this.$swal.isLoading(),
            }).then((result) => {
                if (result.isConfirmed) {
                    this.$swal({
                        title: `${result.value.login}'s avatar`,
                        imageUrl: result.value.avatar_url,
                        backdrop: "rgba(60,60,60,0.8)",
                    });
                }
            });
        },
    },
};
</script>
