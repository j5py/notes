


class Engine:

    def __init__(self, use, capacity):
        self.capacity = capacity
        self.use = use

    def __str__(self):
        return "Use: {}, Capacity: {}".format(self.use, self.capacity)

    def start(self):
        return "Noise!"



class Car(Engine):

    """Car Constructor"""

    def __init__(self, use, capacity, color):
        Engine.__init__(self, use, capacity)
        self.color = color

    def __str__(self):
        return Engine.__str__(self) + f', Color: {self.color}'



class Bedroom:

    def __init__(self, mattress):
        self.mattress = mattress

    def __str__(self):
        return "Mattress: {}".format(self.mattress)



class Van(Car, Bedroom):

    """Van Constructor"""

    def __init__(self, use, capacity, color, mattress):
        Car.__init__(self, use, capacity, color)
        Bedroom.__init__(self, mattress)

    def __str__(self):
        return f'{Car.__str__(self)}, {Bedroom.__str__(self)}'

    def start(self):
        return "We're going to the ocean!"





def display(instance):
    print(                  '\n',
        instance.__doc__,   '\n',
        instance,           '\n',
        instance.start(),   '\n'
    )


display(Car('Sport', 2, 'Black'))

display(Van('Travel', 2, 'White', 'Double'))


