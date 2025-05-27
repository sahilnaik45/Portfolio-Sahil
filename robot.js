// robot.js - Advanced Implementation
class CyberRobot {
    constructor() {
        this.initScene();
        this.loadModel();
        this.setupEventListeners();
        this.animations = {};
        this.mixer = null;
        this.currentAction = null;
    }

    initScene() {
        // Scene setup
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, 400/350, 0.1, 1000);
        this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        
        // Lighting
        const ambientLight = new THREE.AmbientLight(0x404040);
        this.scene.add(ambientLight);
        
        const directionalLight = new THREE.DirectionalLight(0x00f3ff, 1);
        directionalLight.position.set(0, 2, 5);
        this.scene.add(directionalLight);
        
        // Camera position
        this.camera.position.set(0, 1.5, 3);
        
        // Renderer setup
        this.renderer.setSize(400, 350);
        this.renderer.shadowMap.enabled = true;
        document.getElementById('robot-model').appendChild(this.renderer.domElement);
    }

    async loadModel() {
        const loader = new THREE.GLTFLoader();
        
        try {
            const gltf = await loader.loadAsync('models/cyber_robot.glb');
            this.robot = gltf.scene;
            
            // Model adjustments
            this.robot.scale.set(0.8, 0.8, 0.8);
            this.robot.position.y = -1;
            
            // Setup animations
            this.mixer = new THREE.AnimationMixer(this.robot);
            gltf.animations.forEach(anim => {
                this.animations[anim.name] = anim;
            });
            
            // Initial animation
            this.playAnimation('idle', true);
            
            this.scene.add(this.robot);
            this.animate();
            
        } catch(error) {
            console.error('Error loading model:', error);
        }
    }

    playAnimation(name, loop = true) {
        if(this.currentAction) this.currentAction.stop();
        
        const clip = this.animations[name];
        if(!clip) return;
        
        const action = this.mixer.clipAction(clip);
        action.setLoop(loop ? THREE.LoopRepeat : THREE.LoopOnce);
        action.clampWhenFinished = true;
        action.play();
        this.currentAction = action;
    }

    animate() {
        requestAnimationFrame(() => this.animate());
        if(this.mixer) this.mixer.update(0.016);
        this.renderer.render(this.scene, this.camera);
    }

    setupEventListeners() {
        document.querySelectorAll('.dialog-options button').forEach(btn => {
            btn.addEventListener('click', () => {
                const command = btn.dataset.command;
                this.handleCommand(command);
            });
        });
    }

    handleCommand(command) {
        switch(command) {
            case 'about':
                this.showMessage("Sahil Naik: Frontend Developer specializing in React/JavaScript. Currently pursuing TYBCS with 79.4% SSC score.");
                this.playAnimation('nod');
                break;
                
            case 'projects':
                this.showMessage("Featured Projects:\n1. Paw Palace - Pet eCommerce\n2. Hitman's Legacy - Cricket Tribute");
                this.playAnimation('point');
                break;
                
            case 'contact':
                this.showMessage("Contact Sahil:\n📧 naiksahil697@gmail.com\n📞 +91 8788150805\n📍 Pune, MH");
                this.playAnimation('wave');
                break;
        }
    }

    showMessage(text) {
        const dialog = document.querySelector('.dialog-text');
        dialog.textContent = '';
        
        let index = 0;
        const typing = setInterval(() => {
            dialog.textContent += text[index];
            index++;
            if(index >= text.length) clearInterval(typing);
        }, 30);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new CyberRobot();
});

// Add these to class methods
addFacialExpressions() {
    // Implement morph target animations
    this.robot.traverse(child => {
        if(child.morphTargetDictionary) {
            child.morphTargetInfluences = [0, 0];
        }
    });
}

enableVoice() {
    // Web Speech API implementation
    const recognition = new webkitSpeechRecognition();
    recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        this.processVoiceCommand(transcript);
    };
    recognition.start();
}

// Add to initScene()
const composer = new EffectComposer(this.renderer);
composer.addPass(new RenderPass(this.scene, this.camera));

const bloomPass = new BloomPass(1.5, 25, 5);
composer.addPass(bloomPass);

const filmPass = new FilmPass(0.35, 0.025, 648, false);
composer.addPass(filmPass);

document.addEventListener('mousemove', (e) => {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width * 2 - 1;
    const y = -(e.clientY - rect.top) / rect.height * 2 + 1;
    
    this.robot.lookAt(new THREE.Vector3(x*3, y*2, 0));
});