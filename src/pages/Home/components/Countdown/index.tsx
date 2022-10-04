import { differenceInSeconds } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { CountdownContainer, Separator } from './styles'

interface CountdownProps {
  activeCycle: any // 0 countdown precisa dessa informa lá do home, por isso um props
}

export function Countdown({ activeCycle }: CountdownProps) {
  const [amountSecondsPassed, setAmountSecondPassed] = useState(0)

  const totalSeconds = activeCycle ? activeCycle.minutesAmount * 60 : 0

  // para ir de 1 em 1
  useEffect(() => {
    let interval: number // typescript pede a declaração da variavel

    if (activeCycle) {
      interval = setInterval(() => {
        const secondsDifference = differenceInSeconds(
          new Date(),
          activeCycle.startDate,
        )

        if (secondsDifference >= totalSeconds) {
          setCycles((state) =>
            state.map((cycle) => {
              if (cycle.id === activeCycleId) {
                return { ...cycle, finishedDate: new Date() }
              } else {
                return cycle
              }
            }),
          )
          setAmountSecondPassed(totalSeconds) // ficara zerado
          clearInterval(interval)
        } else {
          setAmountSecondPassed(secondsDifference)
        }
      }, 1000)
    }

    return () => {
      // Para limpar os ciclo antigos ()
      clearInterval(interval)
    }
  }, [activeCycle, totalSeconds, activeCycleId])

  return (
    <CountdownContainer>
      <span>{minutes[0]}</span>
      <span>{minutes[1]}</span>
      <Separator>:</Separator>
      <span>{seconds[0]}</span>
      <span>{seconds[1]}</span>
    </CountdownContainer>
  )
}
