-- DropForeignKey
ALTER TABLE "historico_status_pedido" DROP CONSTRAINT "historico_status_pedido_pedidoId_fkey";

-- DropForeignKey
ALTER TABLE "itens_pedido" DROP CONSTRAINT "itens_pedido_pedidoId_fkey";

-- AddForeignKey
ALTER TABLE "historico_status_pedido" ADD CONSTRAINT "historico_status_pedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "itens_pedido" ADD CONSTRAINT "itens_pedido_pedidoId_fkey" FOREIGN KEY ("pedidoId") REFERENCES "pedidos"("id") ON DELETE CASCADE ON UPDATE CASCADE;
