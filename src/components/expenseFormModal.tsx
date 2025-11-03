"use client";

import { useEffect, useState } from "react";
import {
  Modal,
  Button,
  TextInput,
  Select,
  NumberInput,
  Textarea,
  Stack,
} from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { ExpenseType } from "../services/expenseType";

type Props = {
  opened: boolean;
  onClose: () => void;
  onCreate: (data: {
    name: string;
    description: string;
    amount: number;
    expenseType: ExpenseType;
  }) => void;
};

export default function ExpenseFormModal({ opened, onClose, onCreate }: Props) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState<number | undefined>(undefined);
  const [type, setType] = useState<ExpenseType | null>(ExpenseType.OTHER);
  const [nameTouched, setNameTouched] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);
  const [typeTouched, setTypeTouched] = useState(false);

  useEffect(() => {
    if (opened) {
      setNameTouched(false);
      setAmountTouched(false);
      setTypeTouched(false);
    }
  }, [opened]);

  function handleCreate() {
    if (!name || !type || !amount) {
      showNotification({
        title: "Erro",
        message: "Preencha todos os campos obrigatórios.",
        color: "red",
      });
      return;
    }

    onCreate({ name, description, amount, expenseType: type });
    showNotification({
      title: "Sucesso",
      message: "Despesa criada com sucesso.",
      color: "green",
    });

    // reset
    setName("");
    setDescription("");
    setAmount(undefined);
    setType(ExpenseType.OTHER);
    onClose();
  }

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Criar nova despesa"
      centered
    >
      <Stack>
        <TextInput
          label="Nome"
          placeholder="Ex.: Almoço"
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          onBlur={() => setNameTouched(true)}
          required
          error={nameTouched && !name ? "Campo obrigatório" : undefined}
        />

        <Select
          label="Tipo"
          placeholder="Selecione o tipo"
          value={type ?? undefined}
          onChange={(val) => setType(val as ExpenseType)}
          onBlur={() => setTypeTouched(true)}
          data={[
            { value: ExpenseType.FOOD, label: "Alimentação" },
            { value: ExpenseType.TRANSPORT, label: "Transporte" },
            { value: ExpenseType.ACCOMMODATION, label: "Acomodação" },
            { value: ExpenseType.ENTERTAINMENT, label: "Entretenimento" },
            { value: ExpenseType.UTILITIES, label: "Contas" },
            { value: ExpenseType.GROCERIES, label: "Supermercado" },
            { value: ExpenseType.OTHER, label: "Outro" },
          ]}
          required
          error={typeTouched && !type ? "Campo obrigatório" : undefined}
        />

        <NumberInput
          label="Valor"
          placeholder="0,00"
          value={amount}
          onChange={(val: number | string | undefined) =>
            setAmount(
              typeof val === "number" ? val : val ? Number(val) : undefined
            )
          }
          min={0}
          step={0.5}
          required
          onBlur={() => setAmountTouched(true)}
          error={amountTouched && !amount ? "Campo obrigatório" : undefined}
        />

        <Textarea
          label="Descrição"
          placeholder="Descrição opcional"
          value={description}
          onChange={(e) => setDescription(e.currentTarget.value)}
        />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: 16,
          }}
        >
          <Button color="red" variant="light" onClick={onClose}>
            Cancelar
          </Button>
          <Button
            color="green"
            onClick={handleCreate}
            disabled={!name || !amount || !type}
          >
            Criar
          </Button>
        </div>
      </Stack>
    </Modal>
  );
}
