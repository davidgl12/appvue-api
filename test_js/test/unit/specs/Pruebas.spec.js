/* eslint-disable */

import Pruebas from '@/components/Pruebas';
import { shallowMount  } from '@vue/test-utils';
import { expect } from 'chai';

describe('Pruebas', () => {
  it('deberia renderizar correctamente', () =>{})

  it('el texto debería ser el correcto', () => {
    let wrapper = shallowMount(Pruebas);

    expect(wrapper.find('.h1-titulo').text()).to.contain('Este es el componente para las pruebas');
  })

  it('deberia existir un boton con el texto Apagado', () => {
    let wrapper = shallowMount(Pruebas);

    expect(wrapper.find('.toggle__label').text()).to.contain('Apagado');
  });

  it('el estado del boton deberia ser falso', () => {
    let wrapper = shallowMount(Pruebas);

    expect(wrapper.vm.estadoActual).to.be.false;
  });

  it('deberia cambiar el texto y el estadoActual del boton', async() => {
    let wrapper = shallowMount(Pruebas);

    expect(wrapper.find('.toggle__label').text()).to.contain('Apagado');
    expect(wrapper.vm.estadoActual).to.be.false;

    wrapper.find('input[type=checkbox]').setChecked();
    await wrapper.vm.$nextTick();

    expect(wrapper.find('.toggle__label').text()).to.contain('Encendido');
    expect(wrapper.vm.estadoActual).to.be.true;
  });
});