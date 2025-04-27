<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12">
                <b-card no-body>
                    <b-card-header class="mb-0 d-flex justify-content-between ">
                        <div class="header-title">
                            <b-card-title class="">Dripicons Icon</b-card-title>
                        </div>
                    </b-card-header>
                    <b-card-body>
                        <p class="d-flex gap-2 align-items-baseline">Use Class
                            <code>&lt;i data-icon="a" class="icon"&gt;&lt;/div&gt;</code>
                        </p>
                        <b-row class="mt-3">
                            <b-col v-for="icon in Dripicons" :key="icon" sm="6" md="4" lg="3" xl="2">
                                <a class="icons-list d-flex align-items-center gap-3" href="#">
                                    <i :data-icon="icon.dataIcon" class="icon drip"></i>
                                    {{ icon.iconName }}
                                </a>
                            </b-col>
                            <b-col sm="12" class="text-center mt-3">
                                <a class="btn btn-primary" href="http://demo.amitjakhu.com/dripicons/"
                                    target="_blank">View All
                                    Icon</a>
                            </b-col>
                        </b-row>
                    </b-card-body>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>
<script setup>
const Dripicons = [
    { dataIcon: 'a', iconName: '4k Fill' },
    { dataIcon: 'o', iconName: 'Up Arrow' },
    { dataIcon: 'h', iconName: 'Down Arrow' },
    { dataIcon: 'j', iconName: 'Left Arrow' },
    { dataIcon: 'i', iconName: 'Right Arrow' },
    { dataIcon: 'l', iconName: 'Left' },
    { dataIcon: 'k', iconName: 'Down' },
    { dataIcon: 'n', iconName: 'Up' },
    { dataIcon: 'm', iconName: 'Right' },
    { dataIcon: 'f', iconName: 'Anchor' },
    { dataIcon: 'g', iconName: 'File' },
    { dataIcon: 'p', iconName: 'Note' },
    { dataIcon: 's', iconName: 'Dribbble' },
    { dataIcon: 'K', iconName: 'Download' },
    { dataIcon: 'G', iconName: 'Sun' },
    { dataIcon: 'H', iconName: 'Half Light' },
    { dataIcon: 'F', iconName: 'Light' },
    { dataIcon: 'I', iconName: 'Voice' },
    { dataIcon: 'x', iconName: 'Notification' },
    { dataIcon: 'J', iconName: 'Page' },
    { dataIcon: 't', iconName: 'Battery Empty' },
    { dataIcon: 'u', iconName: 'Battery Full' },
    { dataIcon: 'v', iconName: 'Battery One' },
    { dataIcon: 'w', iconName: 'Battery Two' },
    { dataIcon: 'Q', iconName: 'Cart' },
    { dataIcon: 'P', iconName: 'Card' },
    { dataIcon: 'O', iconName: 'Camera' },
    { dataIcon: 'N', iconName: 'Video' },
    { dataIcon: 'S', iconName: 'Check' },
    { dataIcon: 'T', iconName: 'Angle Down' },
    { dataIcon: 'U', iconName: 'Angle Left' },
    { dataIcon: 'V', iconName: 'Angle Right' },
    { dataIcon: 'W', iconName: 'Angle Up' },
    { dataIcon: 'X', iconName: 'Up Arrow' },
    { dataIcon: 'Y', iconName: 'Clock' },
    { dataIcon: 'Z', iconName: 'Reload' },
    { dataIcon: '0', iconName: 'Cloud' },
    { dataIcon: '1', iconName: 'Cloud Download' },
    { dataIcon: '2', iconName: 'Cloud Upload' },
    { dataIcon: '5', iconName: 'Arrow' }
];
</script>