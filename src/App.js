import React, { Component } from "react";

import "./App.css";
import Modal from "./components/Modal/Modal";
import Backdrop from "./components/Backdrop/Backdrop";
import List from "./components/List/List";
import Transition from "react-transition-group/Transition";

class App extends Component {
  state = {
    modalIsOpen: false,
    showBlock: false,
  };

  showModal = () => {
    this.setState({ modalIsOpen: true });
  };

  closeModal = () => {
    this.setState({ modalIsOpen: false });
  };

  render() {
    return (
      <div className="App">
        <h1>React Animations</h1>
        <button
          style={{ marginBottom: 20 }}
          className="Button"
          onClick={() =>
            this.setState((prevState) => ({ showBlock: !prevState.showBlock }))
          }
        >
          Toggle
        </button>
        <br />
        <Transition
          in={this.state.showBlock}
          timeout={1000}
          mountOnEnter
          unmountOnExit
          onEnter={()=> console.log('onEnter')}
          onEntering={()=> console.log('onEntering')}
          onEntered={()=> console.log('onEntered')}
          onExit={()=> console.log('onExit')}
          onExiting={()=> console.log('onExiting')}
          onExited={()=> console.log('onExited')}
        >
          {(state) => (
            <div
              style={{
                backgroundColor: "red",
                width: 100,
                height: 100,
                margin: "auto",
                transition: "opacity 1s ease-out",
                opacity: state === "exiting" ? 0 : 1,
              }}
            ></div>
          )}
        </Transition>
        <Modal show={this.state.modalIsOpen} closed={this.closeModal} />
        <br />
        {this.state.modalIsOpen ? (
          <Backdrop show={this.state.modalIsOpen} />
        ) : null}
        <br />
        <button className="Button" onClick={this.showModal}>
          Open Modal
        </button>
        <h3>Animating Lists</h3>
        <List />
      </div>
    );
  }
}

export default App;

/*
Problem s CSS animations and transitions:
Kdyz se podivame do Elements v devTools, tak uvidime, ze ten Modal i Backdrop tam jsou vzdy, 
i kdyz se zrovna nezobrazuji (to ovladame skrze ty animations and transitions).
Coz muze zpomalovat tu aplikaci.
Muzeme sice tu komponentu renderovat conditionally:
{this.state.modalIsOpen? <Modal show={this.state.modalIsOpen} closed={this.closeModal}/>}
Ale takhle nam nebude fungovat ta animace pro zavirani => zmizi to hned, protoze se nastavi to this.state.modaIsOpen na false a React nevi, ze mame nejakou animaci.
=> using React Transition Groups: npm install react-transition-group --save
<Transition > ma in property - ta rika, jestli to co wrappuje ma byt zobrazeno nebo ne.
timeOut 300 ms. animace mame ale nastavene na 0.4 s, coz neva, akorat to proste nebude delat celou tu animaci.
{state=> <p>{state}</p>} // tohle mi bude zobrazovat jaky stav to zrovna ma, kdyz budu davat toggle tak se m ibude postupne ukazovat entering, pak po 300 ms entered a pri dalsim kliknuti na Toggle: exiting a po 300 ms exited
Pridame tyhle properties do <Transition>: mountOnEnter unmountOnExit. Takhle se nam ten div namountuju do DOMU pri entering a odmountuje pri Exitu, tzn nebude tam furt v tom DOMU.
To <Transition > muzeme presunout do komponenty.
Muzeme ale chtit nastavit jine casy pro entering a exiting.
Ty event onEnter, onEntering,... muzou byt vyhodne kdyz mame vice animaci po sobe, ktere chceme postupne spoustet, kdyz nektera je treba ve stavu onEntering
V modalu nakonec pouzijeme CSSTransiton. ta ma classNames
Pro List pouzijeme TransitionGroup - ta automaticky vygeneruje div, my tam jste pridame component="ul"
Navic jeste pouzijeme CSS Transition, u te ted nemusime pouzivat in property, protoze ta je automaticky passovana pomoci Transition Group
Dalsi animation packages: React Motion, React Router Transition
*/
