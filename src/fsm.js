class FSM {
    /**
     * Creates new FSM instance.
     * @param config
     */
    constructor(config) {
        this.initial = config.initial;   
        this.state = this.initial; 
        this.states = config.states;
        this.historyStates = [];
    }
    /**
     * Returns active state.
     * @returns {String}
     */
    getState() {
        return this.state;
    }

    /**
     * Goes to specified state.
     * @param state
     */
    changeState(state) { 
       /* if(state == 'normal' || state == 'busy' || state == 'hungry' || state == 'sleeping'){
            this.state = state;
        }  else throw new Error("Not a correct state");
        if(this.states.hasOwnProperty(state)){
            this.state = state;
            this.historyStates.push(state);
        }
        else throw new Error("Not a correct state");*/
        var arr = Object.keys(this.states);
        for(var i=0; i<arr.length; i++){
            if(arr[i] == state){
                this.state = state;
                return;
            }
        }
        throw new Error("Not a correct state");
    }

    /**
     * Changes state according to event transition rules.
     * @param event
     */
    trigger(event) {
        for(var prop in this.states[this.state].transitions){
            if(prop == event){
                this.state = this.states[this.state].transitions[event];
                return;
            }
        }
        throw new Error("Not a correct state");
    }

    /**
     * Resets FSM state to initial.
     */
    reset() {
        this.state = this.initial;
    }

    /**
     * Returns an array of states for which there are specified event transition rules.
     * Returns all states if argument is undefined.
     * @param event
     * @returns {Array}
     */
    getStates(event) {
        var arr = [];

        if(event){
            for(var prop in this.states){
                if(this.states[prop].transitions.hasOwnProperty(event)){
                    arr.push(prop);     
                }
            }
            return arr;
        } 
        else if(!event){
            return Object.keys(this.states);
        }
    }

    /**
     * Goes back to previous state.
     * Returns false if undo is not available.
     * @returns {Boolean}
     */
    undo() {}

    /**
     * Goes redo to state.
     * Returns false if redo is not available.
     * @returns {Boolean}
     */
    redo() {}

    /**
     * Clears transition history
     */
    clearHistory() {}
}

module.exports = FSM;

/** @Created by Uladzimir Halushka **/
