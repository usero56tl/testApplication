/**
 * ContactInfoController
 *
 * @description :: Server-side logic for managing Contactinfoes
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	save:function(req, res){

		var id = req.body.id; 
		/** I know that there will probably be something to assigned automatly
		 this var but i assume that user input it to make my job easier since
		 i started sail.js and node.js only today */

		

		/** I did 4 form named id, email, name and message*/
		var email = req.body.email;
		var name = req.body.name;
		var message = req.body.message;

		ContactInfo.create({id:id, email:email, name:name, message:message}).exec(function(err)){
			if(err){
				errorMessage.errorMessage(err)
			}
		}
		return res.json("ok");

		/** Je parle en français juste pour expliquer deux trois trucs à propos de mon code. 
		J'ai codé ce programme sachant que il y a 3h je ne connaissait que les rudiments de JS
		 et j'avais quelque notion de conception de site web. J'ai eu de très gros problème technique
		 avec Sails, Grunt et d'autre qui m'empêchait de pouvoir visualiser le site qui je pense se trouve 
		 quelque part avec "landingpage.ejs". Malgrès le fait que je ne pouvais visualiser le site ni aucun
		 autre site que j'ai pu créer mais,
		 j'ai pu "visualiser" la base de donnée de ContactInfo par http://localhost:1337/ContactInfo.
		 J'ai pu écrire ces lignes de code grace à des recherches de Tuto Sails sur Youtube en Anglais.
		 Et j'ai codé 4 formulaire dans le homepage.ejs
		 Ce que je veux transmettre à travers ces paragraphes c'est mon coté autonome et ma rapidité à apprendre
		 par moi même, j'ai peut-être pas des skills de programmation web plutôt élever mais j'ai toujours su me
		 débrouiller et réussi par moi-même. Merci de m'avoir accordé du temps, je pense pas être à coup sûr 
		 votre candidat idéal mais je ferait en sorte de l'être si vous me prenez. Cordialement, Samuel.  */
	}
	
};

