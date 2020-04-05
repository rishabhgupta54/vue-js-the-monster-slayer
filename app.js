new Vue({
    el: '#app',
    data: {
        playerHealth: 100,
        monsterHealth: 100,
        isGameRunning: false,
        turns: [],
    },
    methods: {
        startGame: function () {
            this.isGameRunning = true;
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.turns = [];
        },
        attack: function () {
            var damage = this.calculateDamage(3, 10);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'PLayer hits monster for ' + damage,
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
            this.checkWin()
        }
        ,
        specialAttack: function () {
            var damage = this.calculateDamage(10, 20);
            this.monsterHealth -= damage;
            this.turns.unshift({
                isPlayer: true,
                text: 'PLayer hits monster hard for ' + damage,
            });
            if (this.checkWin()) {
                return;
            }
            this.monsterAttacks();
            this.checkWin()
        }
        ,
        heal: function () {
            if (this.playerHealth <= 90) {
                this.playerHealth += 10;
            } else {
                this.playerHealth = 100;
            }
            this.monsterAttacks();
        }
        ,
        giveUp: function () {
            this.isGameRunning = false;
        }
        ,
        monsterAttacks: function () {
            var damage = this.calculateDamage(5, 12);
            this.playerHealth -= damage;
            this.turns.unshift({
                isPlayer: false,
                text: 'Monster hits player for ' + damage,
            })
        }
        ,
        calculateDamage: function (min, max) {
            return Math.max(Math.floor(Math.random() * max), min);
        }
        ,
        checkWin: function () {
            if (this.monsterHealth <= 0) {
                if (confirm('You win the game. Would you like to play the new game?')) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
            } else if (this.playerHealth <= 0) {
                if (confirm('You Lost the game. Would you like to play again?')) {
                    this.startGame();
                } else {
                    this.isGameRunning = false;
                }
            }
            return false;
        }
    }
})
;