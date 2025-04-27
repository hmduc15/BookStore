<template>
    <b-row>
        <b-col class="col-sm-12">
            <b-card no-body>
                <b-card-header
                    class="d-flex justify-content-between align-items-center position-relative mb-0">
                    <div class="iq-header-title">
                        <h4 class="mb-0">Add New Books</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <form action="">
                        <div class="form-group">
                            <label>Book Name:</label>
                            <input type="text" class="form-control p-2 bg-white border">
                        </div>
                        <div class="form-group">
                            <label>Book Category:</label>

                            <select-component v-model="value" :options="options"
                                class="form-control"></select-component>

                        </div>
                        <div class="form-group">
                            <label>Book Author:</label>
                            <select-component v-model="author" :options="options1"
                                class="form-control"></select-component>

                        </div>
                        <div class="form-group">
                            <label>Book Image:</label>
                            <input type="file" class="form-control p-2 bg-white border">
                        </div>
                        <div class="form-group">
                            <label>Book pdf:</label>
                            <input type="file" class="form-control p-2 bg-white border">
                        </div>
                        <div class="form-group">
                            <label>Book Price:</label>
                            <input type="text" class="form-control p-2 bg-white border">
                        </div>
                        <div class="form-group">
                            <label>Book Description:</label>
                            <textarea type="text" class="form-control bg-white border"></textarea>
                        </div>
                        <div class="d-flex gap-2">
                            <button type="submit" class="btn btn-danger">Reset</button>
                            <button type="submit" class="btn btn-primary">Save</button>
                        </div>
                    </form>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>

<script setup>
import { ref } from 'vue'

const value = ref(1)
const author = ref(2)
const options = ref(['Book Category', 'General Books', 'History Books', 'Horror Story', 'Art Books'])
const options1 = ref(['Book Author', 'Jhone Steben', 'John Klok', 'Ichae Semos', 'Jules Boutin', 'Kusti Franti', 'David King', 'Henry Jurk', 'Attilio Marzi', 'Argele Intili'])
</script>