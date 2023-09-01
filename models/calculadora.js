function somar(valor1, valor2) {
  if (typeof valor1 != 'number'){
    return 'erro'
  }

  if (typeof valor2 != 'number'){
    return 'erro'
  }

  return valor1 + valor2;
}

exports.somar = somar;
