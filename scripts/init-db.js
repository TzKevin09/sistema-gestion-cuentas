const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcryptjs')

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Inicializando base de datos...')
    
    // Eliminar administrador existente si existe
    await prisma.admin.deleteMany({})
    
    // Crear administrador por defecto
    const hashedPassword = await bcrypt.hash('admin123', 10)
    
    const admin = await prisma.admin.create({
      data: {
        username: 'admin',
        password: hashedPassword,
      },
    })
    
    console.log('✅ Administrador creado exitosamente:')
    console.log('   Usuario: admin')
    console.log('   Contraseña: admin123')
    console.log('   ID:', admin.id)
    
    // Crear configuración por defecto si no existe
    const existingConfig = await prisma.config.findFirst()
    
    if (!existingConfig) {
      await prisma.config.create({
        data: {
          comprarMasTextOrLink: 'Contacta al administrador para comprar más cuentas',
        },
      })
      console.log('✅ Configuración inicial creada')
    }
    
  } catch (error) {
    console.error('❌ Error al inicializar la base de datos:', error)
  } finally {
    await prisma.$disconnect()
  }
}

main()
