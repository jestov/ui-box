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


                                    <form @submit.prevent="sendTask">
                                        <div class="form-group">
                                            <input type="text" v-model="task.title" placeholder="Name" class="form-control">
                                            <input v-model="task.description" placeholder="Insert a color" class="form-control">
                                            <template v-if="edit === false">
                                                <button class="btn btn-primary btn-block">Send</button>
                                            </template>
                                            <template v-else>
                                                <button class="btn btn-primary btn-block">Update</button>
                                            </template>
                                        </div>
                                    </form>


                        </div>
                    </div>
                    <div class="row pt-2">
                        <div class="col-12">
                            <h1>My Resources</h1>
                        </div>
                        <div class="col-3" v-for="task of tasks">
                            <div class="resource">
                                <i class="icon ion-md-copy copy" v-bind:data-clipboard-text="task.description"></i>
                                <div class="bg" v-bind:style="{background:task.description}">
                                </div>
                                <div class="info">
                                    <b>{{task.title}}</b><br>
                                    {{task.description}}
                                </div>
                                <div class="actions">
                                    <button @click="editTask(task._id)" class="btn btn-primary btn-sm">Edit</button>
                                    <button @click="deleteTask(task._id)" class="btn btn-danger btn-sm">Delete</button>
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
    class Task {
        constructor(title, description){
            this.title = title;
            this.description = description;
        }
    };

    export default {
        data() {
            return {
                task: new Task(),
                tasks: [],
                edit: false,
                taskToEdit: ''
            }
        },
        created(){
            this.getTasks();
        },
        methods: {
            sendTask(){
                if (this.edit === false) {
                    fetch('/api/tasks', {
                        method: 'POST',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTasks();
                    })
                }
                else{
                    fetch('/api/tasks/' + this.taskToEdit, {
                        method: 'PUT',
                        body: JSON.stringify(this.task),
                        headers: {
                            'Accept': 'application/json',
                            'Content-type': 'application/json'
                        }
                    })
                    .then(res => res.json())
                    .then(data => {
                        this.getTasks();
                        this.edit = false;
                    })
                }

                this.task = new Task();
            },
            getTasks(){
                fetch('/api/tasks')
                    .then(res => res.json())
                    .then(data => {
                        this.tasks = data;
                        console.log(this.tasks)
                    });
            },
            deleteTask(id){
                fetch('/api/tasks/' + id ,{
                    method: 'DELETE',
                    headers: {
                        'Accept': 'application/json',
                        'Content-type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then(data => {
                    this.getTasks();
                });
            },
            editTask(id){
                fetch('/api/tasks/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.task = new Task(data.title, data.description);
                        this.taskToEdit = data._id;
                        this.edit = true;
                    });
            }
        }
    }
</script>
