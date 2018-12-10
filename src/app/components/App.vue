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
                <div class="col-9 mx-auto">
                    <div class="row pt-5 pb-3">
                        <div class="col-2">
                            <a @click="openAddC()">+ Add new colour</a>
                        </div>
                        <div class="col-2">
                            <a @click="openAddS()">+ Add new snippet</a>
                        </div>
                        <div class="col-2">
                            <a>+ Add new image</a>
                        </div>
                        <template v-if="addC === true">
                            <form @submit.prevent="sendColour" class="form-add">
                                <h3>Add new colour</h3>
                                <div class="form-group">
                                    <input type="text" v-model="colour.title" placeholder="Name" class="form-control">
                                    <input v-model="colour.description" placeholder="Insert a color" class="form-control">
                                    <button class="btn btn-primary btn-block">Send</button>
                                </div>
                                <div class="close" @click="closeActions()">
                                    <i class="icon ion-md-close"></i>
                                </div>
                            </form>
                        </template>
                        <template v-if="editC === true">
                            <form @submit.prevent="sendColour" class="form-edit">
                                <h3>Edit colour</h3>
                                <div class="form-group">
                                    <input type="text" v-model="colour.title" placeholder="Name" class="form-control">
                                    <input v-model="colour.description" placeholder="Insert a color" class="form-control">
                                    <button class="btn btn-primary btn-block">Update</button>
                                </div>
                                <div class="close" @click="closeActions()">
                                    <i class="icon ion-md-close"></i>
                                </div>
                            </form>
                        </template>
                        <template v-if="addS === true">
                            <form @submit.prevent="sendSnippet" class="form-add">
                                <h3>Add new snippet</h3>
                                <div class="form-group">
                                    <input type="text" v-model="snippet.title" placeholder="Name" class="form-control">
                                    <input v-model="snippet.description" placeholder="Insert a Snippet" class="form-control">
                                    <button class="btn btn-primary btn-block">Send</button>
                                </div>
                                <div class="close" @click="closeActions()">
                                    <i class="icon ion-md-close"></i>
                                </div>
                            </form>
                        </template>
                        <template v-if="editS === true">
                            <form @submit.prevent="sendSnippet" class="form-edit">
                                <h3>Edit snippet</h3>
                                <div class="form-group">
                                    <input type="text" v-model="snippet.title" placeholder="Name" class="form-control">
                                    <input v-model="snippet.description" placeholder="Insert a Snippet" class="form-control">
                                    <button class="btn btn-primary btn-block">Update</button>
                                </div>
                                <div class="close" @click="closeActions()">
                                    <i class="icon ion-md-close"></i>
                                </div>
                            </form>
                        </template>
                    </div>
                    <div class="row pb-5">
                        <div class="col-12">
                            <h1>My Colours</h1>
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
                        <div class="col-12">
                            <h1>My Snippets</h1>
                            <div class="row">
                                <div class="col-4" v-for="snippet of snippets">
                                    <div class="resource snippet">
                                        <i class="icon ion-md-copy copy" v-bind:data-clipboard-text="snippet.description"></i>
                                        <div class="info">
                                            <b>{{snippet.title}}</b><br>
                                            <div class="description">{{snippet.description}}</div>
                                        </div>
                                        <div class="actions">
                                            <button @click="editSnippet(snippet._id)" class="btn btn-primary btn-sm">Edit</button>
                                            <button @click="deleteSnippet(snippet._id)" class="btn btn-danger btn-sm">Delete</button>
                                        </div>
                                    </div>
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
</template>



<script>
    class Colour {
        constructor(title, description){
            this.title = title;
            this.description = description;
        }
    };

    class Snippet {
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
                editC: false,
                addC: false,
                colourToEdit: '',
                snippet: new Snippet(),
                snippets: [],
                snippetToEdit: '',
                editS: false,
                addS: false
            }
        },
        created(){
            this.getSnippets();
            this.getColours();
        },
        methods: {
            sendColour(){
                if (this.editC === false) {
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
                        this.editC = false;
                        this.editS = false;
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
                        this.addC = false;
                        this.addS = false;
                        this.editS = false;
                        this.editC = true;
                    });
            },
            closeActions(){
                this.addC = false;
                this.addS = false;
                this.editC = false;
                this.editS = false;
            },
            openAddC(){
                this.editC = false;
                this.editS = false;
                this.addC = true;
            },
            openAddS(){
                this.editC = false;
                this.editS = false;
                this.addS = true;
            },
            sendSnippet(){
                if (this.editS === false) {
                    fetch('/api/snippets', {
                        method: 'POST',
                        body: JSON.stringify(this.snippet),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getSnippets();
                    })
                }
                else{
                    fetch('/api/snippets/' + this.snippetToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.snippet),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getSnippets();
                        this.editS = false;
                        this.editC = false;
                    })
                }

                this.snippet = new Snippet();
            },
            getSnippets(){
                fetch('/api/snippets')
                    .then(res => res.json())
                    .then(data => {
                        this.snippets = data;
                        console.log(this.snippets)
                    });
            },
            deleteSnippet(id){
                fetch('/api/snippets/' + id ,{
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getSnippets();
                });
            },
            editSnippet(id){
                fetch('/api/snippets/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.snippet = new Snippet(data.title, data.description);
                        this.snippetToEdit = data._id;
                        this.addC = false;
                        this.addS = false;
                        this.editC = false;
                        this.editS = true;
                    });
            }
        }
    }
</script>
