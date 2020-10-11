var scene,camera,mesh,renderer,controls

var camera_positions = [[7.989,0.366,-0.18],[-0.002,0.514,7.982],[0.000,5.880,-0.00000],[-0.738,0.1437,-7.964],[-7.824,-0.152,-1.657],[0.000,-7.994,0.00000]]

var used_cube = false
var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);//check if site is on mobile or pc

init();
animate();
// window.history.forward(1)//stops the user from using browser back button

function init() {
    
    renderer = new THREE.WebGLRenderer();
    render_setSize(window.innerWidth,window.innerHeight)
    document.body.appendChild(renderer.domElement);

    window.addEventListener('resize',function(){
        var width = window.innerWidth;
        var height = window.innerHeight;
        renderer.setSize(width,height);
        camera.aspect = width/height;
        camera.updateProjectmatrix;
    })

    scene = new THREE.Scene();
    const img_loader = new THREE.TextureLoader();
    img_loader.load('./1.jpg',function(texture){
        scene.background = texture;
        
    })

    camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 200);
    set_camera(7.989,0.366,-0.18)

    controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.update()
    var light = new THREE.AmbientLight(0xffffff, .8, 0 );
    scene.add(light);

    var loader = new THREE.GLTFLoader();
    loader.load(`./test7.glb`,
        function (gltf)
        {
            scene.add(gltf.scene);
        },
    );
    var raycaster = new THREE.Raycaster();
    var mouse = new THREE.Vector3();

    if(isMobile == false){
        window.addEventListener('dblclick',raycast); //Single click used to rotate 3D-object, event listens for double click to stop possible miss clicks
    }

    function raycast(){
        raycaster.setFromCamera(mouse,camera);
        let ray_x = raycaster.ray.direction.x;
        let ray_y = raycaster.ray.direction.y;
        let ray_z = raycaster.ray.direction.z;
        // Working if statements
        if(ray_y >= 0.8){ //Bottom side
            zoomIN("References")
        }
        else if(ray_y <= -0.8){ //Top side
            zoomIN("Experience")
        }
        else{
            if(ray_z <= -0.9){ //Front side
                zoomIN("Langauge")
            }
            else if(ray_z >= 0.9){//Back side
                zoomIN("Downloads")
            }
            else{
                if(ray_x >= 0.9){//Left side
                    zoomIN("Links")
                }
                else if(ray_x <= -0.9){//Right side
                    zoomIN("About")
                }
            }
        }
        // scene.visible = false;// used to hide 3D object
    };
    
}

function set_camera(x,y,z){
    camera.position.set(x,y,z);
}

function render_setSize(width,height){
    renderer.setSize(width,height)
}

function animate() {
	requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
};

function zoomIN(elementID){
    used_cube = true
    setTimeout(function(){
        setTimeout(function(){
            showDiv(elementID)
        },2000)
        gsap.to(camera.position,{
            duration:2,
            z:0,
            x:0,
            y:0,
            onUpdate: function(){
                camera.updateMatrix();
            }
        });
    
        gsap.to(controls.target,{
            duration:2,
            x:0,
            y:0,
            z:0,
            onUpdate: function(){
                controls.update();
            }
        })
        
    },0);
}

function zoomOut(elementID,previous_camera_pos){
    setTimeout(function(){
        setTimeout(function(){
            gsap.to(camera.position,{
                duration: 3,
                x: previous_camera_pos[0],
                y: previous_camera_pos[1],
                z: previous_camera_pos[2],
                onUpdate:function(){
                    camera.updateMatrix();
                }
            })
        },500)
        render_setSize(window.innerWidth,window.innerHeight)
        set_camera(0,0,0)
        elementID.style.visibility = "hidden"
        elementID.classList.remove("heading")//used to remove class styles
    },3000)
}

var past_div = null

// function used to remove a DIV html tah from the html file
function showDiv(elementId){
    render_setSize(0,0)
    var element = document.getElementById(elementId);

    if((past_div != elementId) && (past_div != null)){ 
        prev_element = document.getElementById(past_div)
        prev_element.classList.remove("heading")
        prev_element.style.visibility = "hidden"
        prev_element.classList.add("hide_section")
    }

    if(isMobile == false)
    {
       testing_stuff()
    }
    
    document.getElementById(elementId+"_btn").disabled = false
    element.classList.remove("hide_section")//used to remove class styles
    element.style.visibility = "visible"
    element.classList.add("heading") //used to add a new class style

    if(isMobile == true){//if statement used to had back button when on mobile
        var test = document.getElementById(elementId+'_btn')
        console.log(test.style.visibility)
        test.style.visibility = "hidden"
        console.log(test.style.visibility)
    }

    if(elementId == "Langauge"){
        var element2 = document.getElementsByClassName("bar_fill")
        for(var i =0; i < element2.length;i++){
            element2[i].style.animationName = "bar_load"
            element2[i].style.width="var(--percent)"
        }
    }
    past_div = elementId
}

function test_function(elementId){//method used to hide html and show the cube
    var element = document.getElementById(elementId);
    var previous_side
    switch(elementId){
        case "About":
            previous_side = camera_positions[0]
            break;
        case "Langauge":
            previous_side = camera_positions[1]
            var element2 = document.getElementsByClassName("bar_fill")
            for(var i =0; i < element2.length;i++){
                element2[i].style.animationName = ""
                element2[i].style.width=""
            }
            break;
        case "Experience":
            previous_side = camera_positions[2]
            break;
        case "Downloads":
            previous_side = camera_positions[3]
            break;
        case "Links":
            previous_side = camera_positions[4]
            break;
        case "References":
            previous_side = camera_positions[5]
            break;
    }
    

    
    if(document.getElementById(elementId+"_btn").disabled == false && used_cube == true){
        element.classList.add("hide_section") //used to add a new class style
        document.getElementById(elementId+"_btn").disabled = true
        zoomOut(element,previous_side)
        used_cube = false
    }
    else{
        var element = document.getElementById(elementId);
        element.classList.add("hide_section") //used to add a new class style
        element.style.visibility = "hidden"
        element.classList.remove("heading")
        render_setSize(window.innerWidth,window.innerHeight)
    }
    
    // console.log(element.style.visibility)
}

function open_new_window(URL){
    window.open("https://"+URL)
}

function testing_stuff(){
    var element = document.getElementById("lang_skils")
    var new_text = 
    '<section style="float: left; width:50%">'+
        '<p class="langauge_text" style"width:100%;">For the past 6 years I have been improving and expading my programming knowledge while also learning new langauges every change I get.</p>'+
        '<p class="langauge_text">I have a greater interest in back-end development but I am also passion for front-end development and providing the user with both a great user interface and expereince.</p>'+
        '<p class="langauge_text" style="width: 70%">I am very experienced working with SQL based databases, I haved used multiple different DBMS like MYSQL, Oracle and MS Access.</p>'+
    '</section>'+

    '<div class="bar_position" style="--top_position: 11rem;--right_position:11rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p>C# - 9/10</p>'+
        '<div id="bar_border" style="--percent: 90%; margin-left:5rem"><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 16rem;--right_position:19rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p >SQL - 8/10</p>'+
        '<div id="bar_border" style="--percent: 80%; margin-left:5rem"><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 16rem;--right_position:4rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p>Python - 8/10</p>'+
        '<div id="bar_border" style="--percent: 80%;margin-left:6rem><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 22rem;--right_position:22rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> JavaScript - 7/10</p>'+
        '<div id="bar_border" style="--percent: 70%"><div class="bar_fill"></div></div>'+
    '</div> '+

    '<div class="bar_position" style="--top_position: 22rem;--right_position:11rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> C++ - 7/10</p>'+
        '<div id="bar_border" style="--percent: 70%"><div class="bar_fill"></div></div>'+
    '</div> '+

    '<div class="bar_position" style="--top_position: 22rem;--right_position:0rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> Java - 7/10</p>'+
        '<div id="bar_border" style="--percent: 70%"><div class="bar_fill"></div></div>'+
    '</div> '+

    '<div class="bar_position" style="--top_position: 28rem;--right_position:11rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> Delphi - 6/10</p>'+
        '<div id="bar_border" style="--percent: 60%"><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 33rem;--right_position:19rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> HTML - 5/10</p>'+
        '<div id="bar_border" style="--percent: 50%"><div class="bar_fill"></div></div>'+
    '</div>'+

    '<div class="bar_position" style="--top_position: 33rem;--right_position:4rem;--bar_width:5rem;--bar_height:1.5rem;">'+
        '<p> CSS - 5/10</p>'+
        '<div id="bar_border" style="--percent: 50%"><div class="bar_fill"></div></div>'+
    '</div>'

    element.innerHTML = new_text
}