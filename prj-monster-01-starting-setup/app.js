
function getRamndomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            counterRound: 0,
            specialAttackCooldown: 0,
            winner: null,
            logMessages: []
        };
    },
    computed: {
        monsterBarStyles() {
            if(this.monsterHealth < 0) {
                return {
                    width: '0%'
                };
            }
            return {
                width: this.monsterHealth + '%'
            };
        },
        playerBarStyles() {
            if (this.playerHealth < 0 ) {
                return {
                    width: '0%'
                }
            }
            return {
                width: this.playerHealth + '%'
            };
        }, 
        mayUseSpecialAttack() {
            return this.specialAttackCooldown === 0;
        }
       
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <= 0){
                // A draw
                this.winner = 'draw';
            }else if (value <= 0) {
                // Player lost
                this.winner = 'monster';
            }
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <=0) {
                // A draw
                this.winner = 'draw';
            } else if (value <= 0) {
                // Monster lost
                this.winner = 'player'

            }
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.counterRound = 0;
            this.winner = null;
            this.specialAttackCooldown = 0;
            this.logMessages= [];
        },
        attackMonster() {
            this.counterRound++;
           if (this.specialAttackCooldown > 0) this.specialAttackCooldown--
           const attackValue = getRamndomValue(5, 12);
           this.monsterHealth -= attackValue;
           this.addLogMessages('player', 'attack', attackValue)
           this.attackPlayer();
        },
        attackPlayer() {
            const attackValue = getRamndomValue(8, 15);
            this.playerHealth -= attackValue;
            this.addLogMessages('monster', 'attack', attackValue)
        },
        specialAttackMonster() {
            this.counterRound++
            const attackValue = getRamndomValue(10, 25);
            this.monsterHealth -= attackValue;
            this.specialAttackCooldown = 2;
            this.addLogMessages('player', 'attack', attackValue)
            this.attackPlayer();
        },
        healPlayer() {
            this.counterRound++;
            const healValue = getRamndomValue(8, 20);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            } else {
                this.playerHealth += healValue;
            };
            this.addLogMessages('player', 'heal', healValue)
            this.attackPlayer();
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessages(who,what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            })
        }

    }
});
 

app.mount('#game');
            
