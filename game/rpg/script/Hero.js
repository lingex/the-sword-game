( function(){
// model
	var anims={  free: '../assets/models/ou_yang@stand.FBX',
			     skill: '../assets/models/ou_yang@skill.FBX',
			     attack: '../assets/models/ou_yang@attack.FBX',//aaa
			     die: '../assets/models/ou_yang@die.FBX'  };
	var modelConfig = {
		url: '../assets/models/ou_yang.FBX',
		animation:'walk',
		animationsFiles:anims,
		material:{alphaTest:.5},
		boundingBox:{x:70, y:180, z:70},
		scale:.03,//.04
		position:{x:281.8434354806188, y: 0, z: 259.4504251984771},
		topBoard:{height:280, scale:{x:100, y:10, z:1}},
		selectable:true
	};
	
	ResourceManager.loadModel(modelConfig, onLoaded);
	
	function onLoaded( model ) {
		
		model.playAction('free');
		player = model;
		
		camera.setSource&&camera.setSource(player);
		var entity = new iEntity();
		entity.setModel(model);
		entity.setRadius(1.5);
		entity.rangedAttack=true;
		entity.attackHitTime=0.89;
		entity.rangedAttack=true;
		entity.attackRange=15;
		entity.maxHP= entity.HP=1000;
		entity.addTopBoard(modelConfig.topBoard);
		entity.addAIComponent();
		entity.addToTeam(1, 1);
		entity.addToScene();
		entity.addUpdater();
//    	entity.audio=new THREE.PositionalAudio( audioListener );
//    	entity.model.add(entity.audio);
//    	loadAudio( '../assets/audio/s1.mp3', (function(object){return function ( buffer ) {
//			entity.audio.setBuffer( buffer );
//			entity.audio.setRefDistance( 20 );
//			entity.audio.setVolume( 2 );
//		} })(object) );
		// ���ӹ���
		addMonster();
    	
    	var geometry = new THREE.PlaneBufferGeometry( 4, 4 );
    	var vertices = geometry.attributes.position.array;
        for ( var j = 0, l = vertices.length; j < l; j += 3 ) {
        	vertices[ j + 2 ]=-vertices[ j + 1 ];
        	vertices[ j + 1 ]=0;
    	}
    	var texture = THREE.ImageUtils.loadTexture('../assets/materials/Rune1d.png');
    	var material = new THREE.MeshBasicMaterial( {color: 0xff0000,depthTest: true,depthWrite:false, map: texture,//alphaMap
    		transparent: true,   blending: THREE.AdditiveBlending } );
    	var cone = new THREE.Mesh( geometry, material );
    	cone.renderOrder = -1;
    	cone.update = function(deltaTime){
    		if(this.visible){
    			if(this.lifeTime<now) this.visible=false;
    			this.rotation.y+=.05;
    			if(this.rotation.y>Math.PI*2)this.rotation.y=0;
    		}
    	};
    	cone.model=model;
    	model.glory=cone;
    	//addUpdater(cone);
//    	model.add(cone)
	}
})();
