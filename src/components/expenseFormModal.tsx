"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
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
  const [amount, setAmount] = useState<string>("");
  const [type, setType] = useState<ExpenseType>(ExpenseType.OTHER);
  const [nameTouched, setNameTouched] = useState(false);
  const [amountTouched, setAmountTouched] = useState(false);

  useEffect(() => {
    if (opened) {
      setNameTouched(false);
      setAmountTouched(false);
    }
  }, [opened]);

  function handleCreate() {
    const amountNum = parseFloat(amount);

    if (!name || !type || !amount || isNaN(amountNum)) {
      toast.error("Erro", {
        description: "Preencha todos os campos obrigatórios.",
      });
      return;
    }

    onCreate({ name, description, amount: amountNum, expenseType: type });
    toast.success("Sucesso", {
      description: "Despesa criada com sucesso.",
    });

    // reset
    setName("");
    setDescription("");
    setAmount("");
    setType(ExpenseType.OTHER);
    onClose();
  }

  return (
    <Dialog open={opened} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Criar nova despesa</DialogTitle>
          <DialogDescription>
            Preencha os dados da despesa abaixo.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">
              Nome <span className="text-red-500">*</span>
            </Label>
            <Input
              id="name"
              placeholder="Ex.: Almoço"
              value={name}
              onChange={(e) => setName(e.target.value)}
              onBlur={() => setNameTouched(true)}
            />
            {nameTouched && !name && (
              <p className="text-sm text-red-500">Campo obrigatório</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="type">
              Tipo <span className="text-red-500">*</span>
            </Label>
            <Select
              value={type}
              onValueChange={(val) => setType(val as ExpenseType)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Selecione o tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ExpenseType.FOOD}>Alimentação</SelectItem>
                <SelectItem value={ExpenseType.TRANSPORT}>
                  Transporte
                </SelectItem>
                <SelectItem value={ExpenseType.ACCOMMODATION}>
                  Acomodação
                </SelectItem>
                <SelectItem value={ExpenseType.ENTERTAINMENT}>
                  Entretenimento
                </SelectItem>
                <SelectItem value={ExpenseType.UTILITIES}>Contas</SelectItem>
                <SelectItem value={ExpenseType.GROCERIES}>
                  Supermercado
                </SelectItem>
                <SelectItem value={ExpenseType.OTHER}>Outro</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="amount">
              Valor <span className="text-red-500">*</span>
            </Label>
            <Input
              id="amount"
              type="number"
              placeholder="0,00"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              onBlur={() => setAmountTouched(true)}
              min={0}
              step={0.01}
            />
            {amountTouched && !amount && (
              <p className="text-sm text-red-500">Campo obrigatório</p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Descrição</Label>
            <Textarea
              id="description"
              placeholder="Descrição opcional"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </div>

        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleCreate} disabled={!name || !amount || !type}>
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
