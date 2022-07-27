import { Play } from 'phosphor-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'

import {
  CountdownContainer,
  FormContainer,
  HomerContainer,
  MinutesAmountInput,
  Separator,
  StartCountdownButton,
  TaskInput,
} from './styles'

// Controlled / uncontrolled

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos.')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos.'),
})

// interface NewCycleFormData {
//   task: string
//   minutesAmount: number
// }

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>

interface Cycle {
  id: string
  task: string
  minutesAmount: number
}

export function Home() {
  // Informacao de todos os ciclos
  const [cycles, setCycles] = useSate<Cycle[]>([])
  // Informacao de qual ciclo está ativo
  const [activeCycleId, setActiveCycleId] = useState<string | null>(null)

  const { register, handleSubmit, watch, reset } = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  function handleCreateNewCycle(data: NewCycleFormData) {
    const id = String(new Data().getTime())

    const newCycle: Cycle = {
      id,
      task: data.task,
      minutesAmount: data.minutesAmount,
    }

    setCycles((state) => [...cycles, newCycle])
    setActiveCycleId(id)
    reset()
  }

  // Para saber qual o id da ciclo ativo
  const activeCycle = cycles.find((cycle) => cycle.id === activeCycleId)

  const task = watch('task')
  const isSubmitDisabled = !task

  return (
    <HomerContainer>
      <form onSubmit={handleSubmit(handleCreateNewCycle)} action="">
        <FormContainer>
          <label htmlFor="">Vou trabalhar em </label>
          <TaskInput
            id="task"
            list="task-suggestions"
            placeholder="Dê um nome para o seu projeto"
            {...register('task')}
          />

          <datalist id="task-suggestions">
            <option value="Projeto1" />
            <option value="Projeto2" />
            <option value="Projeto3" />
            <option value="Projeto4" />
          </datalist>

          <label htmlFor="">durante</label>
          <MinutesAmountInput
            type="number"
            id="minutesAmount"
            placeholder="00"
            step={5} // ele pula de 5 em 5
            min={5}
            max={60}
            {...register('minutesAmount', { valueAsNumber: true })}
          />

          <span>minutos.</span>
        </FormContainer>
        <CountdownContainer>
          <span>0</span>
          <span>0</span>
          <Separator>:</Separator>
          <span>0</span>
          <span>0</span>
        </CountdownContainer>

        <StartCountdownButton disabled={isSubmitDisabled} type="submit">
          <Play size={24} />
          Começar
        </StartCountdownButton>
      </form>
    </HomerContainer> // quando não tem task, o disabled é desabilitado (!task)
  )
}
