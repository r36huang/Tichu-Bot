setInterval(function(){
	$.get('http://tichuiq.com/public_html/get_game_data.php').then(function(r){
			var r = JSON.parse(r); 
			var j;
			for(i = 0; i < 4; i++) {
				if(typeof(r.players[i].cards[0]) == "string") { // you only get to see your own hand, every other hand is just a "number"
					var s = r.players[i].cards;
					s.forEach(function(c){cardsInHand[c] = true;});
					j = i; // keep track of what your player id is
				}
			};
			if(r.phase == "2") {
				$.get('http://tichuiq.com/public_html/call_grand.php?call=1');
			} else if(r.phase == "3") {
				$.get('http://tichuiq.com/public_html/give_cards.php&cards[]=12&cards[]=0&cards[]=13')
			} else {
				$.get('http://tichuiq.com/public_html/pass.php').then(function(t){
						var t = JSON.parse(t);
						if(t.error != "") {
							for(i = r.players[j].cards.length; i > 0; i--) {
								$.get('http://tichuiq.com/public_html/play.php?cards[]='+i);
							}
						}
					});
			}
			switch(r.phase) {
				case 2: 
					$.get('http://tichuiq.com/public_html/call_grand.php?call=1');
					break;
				case 3:
					$.get('http://tichuiq.com/public_html/give_cards.php&cards[]=12&cards[]=0&cards[]=13')
					break;
				default:
					$.get('http://tichuiq.com/public_html/pass.php').then(function(t){
						var t = JSON.parse(t);
						if(t.error != "") {
							for(i = r.players[j].cards.length; i > 0; i--) {
								$.get('http://tichuiq.com/public_html/play.php?cards[]='+i);
							}
						}
					});
			}
		})
}, 500)