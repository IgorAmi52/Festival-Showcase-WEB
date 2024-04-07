export interface Festival {
  ID: String;
  naziv: String;
  opis: String;
  slike: Array<String>;
  tip: String;
  prevoz: String;
  cena: Float32Array;
  maxOsoba: Int16Array;
}
