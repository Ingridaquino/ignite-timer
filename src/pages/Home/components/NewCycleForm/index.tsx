import { FormContainer, MinutesAmountInput, TaskInput } from '../styles'

export function NewCycleForm() {
  return (
    <FormContainer>
      <label htmlFor="">Vou trabalhar em </label>
      <TaskInput
        id="task"
        list="task-suggestions"
        placeholder="Dê um nome para o seu projeto"
        disabled={!!activeCycle} // para desabilitar o input, caso tenha um ciclo rodando
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
        min={1}
        max={60}
        disabled={!!activeCycle}
        {...register('minutesAmount', { valueAsNumber: true })}
      />

      <span>minutos.</span>
    </FormContainer>
  )
}
