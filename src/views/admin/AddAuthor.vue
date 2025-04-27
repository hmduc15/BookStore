<template>
    <b-row class="row">
        <b-col>
            <b-card no-body>
                <b-card-header
                    class="d-flex justify-content-between align-items-center position-relative mb-0">
                    <div class="iq-header-title">
                        <h4 class="mb-0">Add New Author</h4>
                    </div>
                </b-card-header>
                <b-card-body>
                    <form action="">
                        <div class="form-group">
                            <label>Author Name:</label>
                            <input type="text" class="form-control p-2 bg-white border">
                        </div>
                        <div class="form-group">
                            <label>Author Profile:</label>
                            <input type="file" class="form-control p-2 bg-white border">


                        </div>
                        <div class="form-group">
                            <label>Author Email:</label>
                            <input type="text" class="form-control p-2 bg-white border">
                        </div>
                        <div class="form-group">
                            <label>Author Description:</label>
                            <textarea type="text" class="form-control bg-white border"></textarea>
                        </div>

                        <div class="d-flex gap-2">
                            <b-button type="submit" variant="danger">Reset</b-button>
                            <b-button type="submit" variant="primary">Save</b-button>
                        </div>

                    </form>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>