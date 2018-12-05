<template>
    <div>
        <div class="container-fluid">
            <div class="row">
                <nav class="col-2 sidebar">
                    <a href="/" class="navbar-brand"><img src="http://localhost:3000/img/logo.png" class="mw-100"></a>
                    <ul>
                        <span>My Projects</span>
                        <li><i class="icon ion-md-folder"></i> Flaskcom</li>
                        <li><i class="icon ion-md-folder"></i> Aballoon</li>
                        <li><i class="icon ion-md-folder"></i> Grid Weaver</li>
                    </ul>
                </nav>
                <div class="col-8 mx-auto">
                    <div class="row pt-5">
                        <div class="col-12">

                            <form @submit.prevent="sendColour">
                                <div class="form-group">
                                    <input type="text" v-model="colour.title" placeholder="Name" class="form-control">
                                    <input v-model="colour.description" placeholder="Insert a color" class="form-control">
                                    <button class="btn btn-primary btn-block">Send</button>
                                </div>
                            </form>
                            <template v-if="edit === true">
                                <form @submit.prevent="sendColour" class="form-edit">
                                <div class="form-group">
                                    <input type="text" v-model="colour.title" placeholder="Name" class="form-control">
                                    <input v-model="colour.description" placeholder="Insert a color" class="form-control">
                                    <button class="btn btn-primary btn-block">Update</button>
                                </div>
                                <div class="close" @click="closeEdit()">
                                    <i class="icon ion-md-close"></i>
                                </div>
                                </form>
                            </template>

                        </div>
                    </div>
                    <div class="row pt-2">
                        <div class="col-12">
                            <h1>My Resources</h1>
                        </div>
                        <div class="col-3" v-for="colour of colours">
                            <div class="resource">
                                <i class="icon ion-md-copy copy" v-bind:data-clipboard-text="colour.description"></i>
                                <div class="bg" v-bind:style="{background:colour.description}">
                                </div>
                                <div class="info">
                                    <b>{{colour.title}}</b><br>
                                    {{colour.description}}
                                </div>
                                <div class="actions">
                                    <button @click="editColour(colour._id)" class="btn btn-primary btn-sm">Edit</button>
                                    <button @click="deleteColour(colour._id)" class="btn btn-danger btn-sm">Delete</button>
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="message">
                            Copied
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>



<script>
    class Colour {
        constructor(title, description){
            this.title = title;
            this.description = description;
        }
    };

    export default {
        data() {
            return {
                colour: new Colour(),
                colours: [],
                edit: false,
                colourToEdit: ''
            }
        },
        created(){
            this.getColours();
        },
        methods: {
            sendColour(){
                if (this.edit === false) {
                    fetch('/api/colours', {
                        method: 'POST',
                        body: JSON.stringify(this.colour),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getColours();
                    })
                }
                else{
                    fetch('/api/colours/' + this.colourToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.colour),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getColours();
                        this.edit = false;
                    })
                }

                this.colour = new Colour();
            },
            getColours(){
                fetch('/api/colours')
                    .then(res => res.json())
                    .then(data => {
                        this.colours = data;
                        console.log(this.colours)
                    });
            },
            deleteColour(id){
                fetch('/api/colours/' + id ,{
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getColours();
                });
            },
            editColour(id){
                fetch('/api/colours/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.colour = new Colour(data.title, data.description);
                        this.colourToEdit = data._id;
                        this.edit = true;
                    });
            },
            closeEdit(){
                this.edit = false;
            }
        }
    }
</script>
