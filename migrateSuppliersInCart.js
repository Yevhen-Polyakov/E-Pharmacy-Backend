import mongoose from "mongoose";
import { Cart } from "./src/models/cart.js";
import { Products } from "./src/models/products.js";
import dotenv from "dotenv";

dotenv.config();

const migrateCartSuppliers = async () => {
    try {
        console.log("🔄 Начало миграции поля suppliers в корзинах...");

        await mongoose.connect(process.env.MONGO_URL);
        console.log("✅ Подключение к БД установлено");

        const carts = await Cart.find({});
        console.log(`📦 Найдено корзин: ${carts.length}`);

        let updatedCount = 0;
        let itemsUpdated = 0;

        for (const cart of carts) {
            let cartUpdated = false;

            for (const item of cart.items) {
                if (!item.suppliers) {
                    const product = await Products.findById(item.productId);

                    if (product) {
                        item.suppliers = product.suppliers;
                        cartUpdated = true;
                        itemsUpdated++;
                    } else {
                        console.warn(`⚠️  Товар не найден для товара в корзине: ${item.productId}`);
                    }
                }
            }

            if (cartUpdated) {
                await cart.save();
                updatedCount++;
            }
        }

        console.log(`✅ Миграция завершена!`);
        console.log(`   - Обновлено корзин: ${updatedCount}`);
        console.log(`   - Заполнено товаров: ${itemsUpdated}`);
    } catch (error) {
        console.error("❌ Ошибка при миграции:", error);
        process.exit(1);
    } finally {
        await mongoose.connection.close();
        process.exit(0);
    }
};

migrateCartSuppliers();
