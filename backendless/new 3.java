class Wheel {
  int radius = 4;

  int getRadius() {
    return radius;
  }
}

class Car {
  Wheel _leftFrontWheel;

  Wheel getWheel() {
    return _leftFrontWheel;
  }
}




void main() {
  Car car1 = Car();
  car1.getWheel().getRadius();
}