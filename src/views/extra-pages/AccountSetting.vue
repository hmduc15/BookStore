<template>
    <b-row>
        <b-col lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <b-card-title>Account Setting</b-card-title>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div class="acc-edit">
                        <form>
                            <div class="form-group">
                                <label for="uname">User Name:</label>
                                <input type="text" class="form-control" id="uname" value="Barry@01">
                            </div>
                            <div class="form-group">
                                <label for="email">Email Id:</label>
                                <input type="email" class="form-control" id="email" value="Barryjohn@gmail.com">
                            </div>
                            <div class="form-group">
                                <label for="altemail">Alternate Email:</label>
                                <input type="email" class="form-control" id="altemail" value="designtheme@gmail.com">
                            </div>
                            <div class="form-group">
                                <label class="d-block">Language Known:</label>
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="english" checked>{{ '' }}
                                    <label class="custom-control-label" for="english">English</label>
                                </div>
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="french" checked>{{ '' }}
                                    <label class="custom-control-label" for="french">French</label>
                                </div>
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="hindi">{{ '' }}
                                    <label class="custom-control-label" for="hindi">Hindi</label>
                                </div>
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="spanish" checked>{{ '' }}
                                    <label class="custom-control-label" for="spanish">Spanish</label>
                                </div>
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="arabic">{{ '' }}
                                    <label class="custom-control-label" for="arabic">Arabic</label>
                                </div>
                                <div class="custom-control custom-checkbox custom-control-inline">
                                    <input type="checkbox" class="custom-control-input" id="italian">{{ '' }}
                                    <label class="custom-control-label" for="italian">Italian</label>
                                </div>
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>{{ '' }}
                            <button type="reset" class="btn bg-danger">Cancel</button>
                        </form>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
        <b-col lg="6">
            <b-card no-body>
                <b-card-header class="d-flex justify-content-between mb-0">
                    <div class="header-title">
                        <b-card-title>Social Media</b-card-title>
                    </div>
                </b-card-header>
                <b-card-body>
                    <div class="acc-edit">
                        <form>
                            <div class="form-group">
                                <label for="facebook">Facebook:</label>
                                <input type="text" class="form-control" id="facebook" value="www.facebook.com">
                            </div>
                            <div class="form-group">
                                <label for="twitter">Twitter:</label>
                                <input type="text" class="form-control" id="twitter" value="www.twitter.com">
                            </div>
                            <div class="form-group">
                                <label for="google">Google +:</label>
                                <input type="text" class="form-control" id="google" value="www.google.com">
                            </div>
                            <div class="form-group">
                                <label for="instagram">Instagram:</label>
                                <input type="text" class="form-control" id="instagram" value="www.instagram.com">
                            </div>
                            <div class="form-group">
                                <label for="youtube">You Tube:</label>
                                <input type="text" class="form-control" id="youtube" value="www.youtube.com">
                            </div>
                            <button type="submit" class="btn btn-primary">Submit</button>{{ '' }}
                            <button type="reset" class="btn bg-danger">Cancel</button>
                        </form>
                    </div>
                </b-card-body>
            </b-card>
        </b-col>
    </b-row>
</template>