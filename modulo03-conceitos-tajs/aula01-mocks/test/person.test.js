import { describe, it, expect, jest } from '@jest/globals'
import Person from '../src/person'

describe('#Person suite', () => {
  describe('#validate', () => {
    it('should throw if the name is not present', () => {
      const mockInvalidPerson = {
        name: '',
        cpf: '064.606.674-97',
        lastName: 'Victor',
      }
      expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error('name is required'))
    })

    it('should throw if the cpf is not present', () => {
      const mockInvalidPerson = {
        name: 'John',
        cpf: ''
      }
      expect(() => Person.validate(mockInvalidPerson)).toThrow(new Error('cpf is required'))
    })

    it('should not throw person is valid', () => {
      const mockInvalidPerson = {
        name: 'John',
        cpf: '064.606.674-97'
      }
      expect(() => Person.validate(mockInvalidPerson)).not.toThrow()
    })
  })

  describe('#format', () => {
    // Data validated

    it('should format the person name and CPF', () => {
      // AA

      // Arrange = Prepara

      const mockPerson = {
        name: 'João Victor',
        cpf: '000.000.000-00',
      }

      // Act = Executar
    
      const formatedPerson = Person.format(mockPerson)


      // Assert = Validar

      const expected = {
        name: 'João',
        cpf: '00000000000',
        lastName: 'Victor',
      }

      expect(formatedPerson).toStrictEqual(expected)
    })
  })

  describe('#process', () => {
    it('should process a valid person', () => {

      const mockPerson = {
        name: 'João Victor',
        cpf: '000.000.000-00'
      }

      jest.spyOn(
        Person,
        Person.validate.name
      ).mockReturnValue()

      jest.spyOn(
        Person,
        Person.format.name
      ).mockReturnValue({
        name: 'João',
        cpf: '00000000000',
        lastName: 'Victor'
      })

      const result = Person.process(mockPerson)

      const expected = 'ok'
      expect(result).toStrictEqual(expected)
    })
  })

  describe('#save', () => {
    it('should throw if not save person', () => {
      const mockInvalidPerson = {
        name: 'João',
        cpf: '000.000.000-00',
      }

      expect(() => Person.save(mockInvalidPerson)).toThrow(new Error(`cannot save invalid person: ${JSON.stringify(mockInvalidPerson)}`))
    })

    it('should throw save a validated person', () => {
      const mockPerson = {
        name: 'João',
        cpf: '000.000.000-00',
        lastName: 'Victor'
      }

      expect(() => Person.save(mockPerson)).not.toThrow(new Error(`cannot save invalid person: ${JSON.stringify(mockPerson)}`))
    })
  })
})