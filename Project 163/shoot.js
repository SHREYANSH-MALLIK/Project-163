AFRAME.registerComponent("bullets", {
    init: function () {
      this.shootBullet();
    },
    shootBullet: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var bullet = document.createElement("a-entity");
  
          bullet.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.5,
          });
  
          bullet.setAttribute("material", "color", "green");
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          bullet.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
  
          //set the velocity and it's direction
          bullet.setAttribute("velocity", direction.multiplyScalar(-10));
  
          var scene = document.querySelector("#scene");
  
          //set the bullet as the dynamic entity
          bullet.setAttribute("dynamic-body", {
            shape: "sphere",
            mass: "0",
          });
  
          //add the collide event listener to the bullet
          bullet.addEventListener("collide", this.removeBullet);
  
          scene.appendChild(bullet);
          this.shootSound()
        }
      });
    },
    removeBullet: function (e) {
      //bullet element
      var element = e.detail.target.el;
  
      //element which is hit
      var elementHit = e.detail.body.el;
  
      if (elementHit.id.includes("box")) {
        elementHit.setAttribute("material", {
          opacity: 1,
          transparent: true,
        });
  
        //impulse and point vector
        var impulse = new CANNON.Vec3(-2, 2, 1);
        var worldPoint = new CANNON.Vec3().copy(
          elementHit.getAttribute("position")
        );
  
        elementHit.body.applyImpulse(impulse, worldPoint);
  
        //remove event listener
        element.removeEventListener("collide", this.removeBullet);
  
        //remove the bullets from the scene
        var scene = document.querySelector("#scene");
        scene.removeChild(element);
      }
    },
  
    shootSound: function(){
      var entity = document.querySelector("#sound1")
      entity.components.sound.playSound()
    }
});

AFRAME.registerComponent("player-movement", {
    init: function () {
      this.walk();
    },
    walk: function () {
      window.addEventListener("keydown", (e) => {
        if (
          e.key === "ArrowUp" ||
          e.key === "ArrowRight" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowDown"
        ) {
          var entity = document.querySelector("#sound2");
          entity.components.sound.playSound();
        }
      });
    },
  }); 

AFRAME.registerComponent("targets", {
    init: function () {
      //starting x position
      posX = -20;
      //starting z-position
      posZ = 85;
  
      for (var i = 0; i < 10; i++) {
        //create targets entity
        var wireFence1 = document.createElement("a-entity");
        var wireFence2 = document.createElement("a-entity");
        var wireFence3 = document.createElement("a-entity");
        var wireFence4 = document.createElement("a-entity");
  
        //set x, y and z position
        posX = posX + 5;
        posY = 2.5;
        posZ = posZ - 10;
  
        //scale 
        var scale = { x: 2, y: 2, z: 2 };
  
        //set the id
        wireFence1.setAttribute("id", "wireFence1" + i);
        wireFence2.setAttribute("id", "wireFence2" + i);
        wireFence3.setAttribute("id", "wireFence3" + i);
        wireFence4.setAttribute("id", "wireFence4" + i);
        
        //set the position
        wireFence1.setAttribute("position", { x: posX, y: 2.5, z: -35 });
        wireFence2.setAttribute("position", { x: posX, y: 2.5, z: 85 });
        wireFence3.setAttribute("position", { x: -30, y: 2.5, z: posZ });
        wireFence4.setAttribute("position", { x: 50, y: 2.5, z: posZ });
        
        //set the scale
        wireFence1.setAttribute("scale", scale);
        wireFence2.setAttribute("scale", scale);
        wireFence3.setAttribute("scale", scale);
        wireFence4.setAttribute("scale", scale);
       
        //set the model
        wireFence1.setAttribute(
          "gltf-model",
          "./models/barbed_wire_fence/scene.gltf"
        );
        wireFence2.setAttribute(
          "gltf-model",
          "./models/barbed_wire_fence/scene.gltf"
        );
        wireFence3.setAttribute(
          "gltf-model",
          "./models/barbed_wire_fence/scene.gltf"
        );
        wireFence4.setAttribute(
          "gltf-model",
          "./models/barbed_wire_fence/scene.gltf"
        );

        wireFence3.setAttribute("rotation", {x: 0, y: 90, z:0})
        wireFence4.setAttribute("rotation", {x: 0, y: 90, z:0})

        //set the physics body
        wireFence1.setAttribute("static-body", {});
        wireFence2.setAttribute("static-body", {});
        wireFence3.setAttribute("static-body", {});
        wireFence4.setAttribute("static-body", {});
       
        var sceneEl = document.querySelector("#scene");
        //attach the entity to the scene
        sceneEl.appendChild(wireFence1);
        sceneEl.appendChild(wireFence2);
        sceneEl.appendChild(wireFence3);
        sceneEl.appendChild(wireFence4);      
  
      }
    },
  });