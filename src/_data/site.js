// Dados centrais do negócio (NAP): altere aqui e o site inteiro é atualizado.
export default {
  name: "Grace Cortez Atelier",
  shortName: "Grace Cortez",
  url: process.env.SITE_URL || "https://www.gracecortez.com.br",
  lang: "pt-BR",
  year: new Date().getFullYear(),
  tagline: "Aluguel de vestidos de noiva, festa, debutantes, damas e ternos em Divinópolis",
  founder: "Grace Cortez",
  phone: "(37) 3212-6470",
  phoneIntl: "+553732126470",
  whatsapp: "(37) 98814-6470",
  whatsappIntl: "5537988146470",
  address: {
    street: "Av. Cel. Júlio Ribeiro Gontijo, 326",
    district: "Esplanada",
    city: "Divinópolis",
    state: "MG",
    zip: "35501-000",
    country: "BR",
  },
  hours: {
    label: "Segunda a sexta, das 9h às 19h",
    note: "Atendimento com horário marcado. Sábado e domingo fechado.",
  },
  instagram: "https://www.instagram.com/gracecortezatelier/",
  facebook: "https://www.facebook.com/gracecortezatelier/",
  cities: [
    "Divinópolis", "Nova Serrana", "Itaúna", "Formiga", "Santo Antônio do Monte",
    "Bom Despacho", "Cláudio", "Carmo do Cajuru", "Oliveira", "Pará de Minas",
    "Lagoa da Prata", "Itapecerica", "São Sebastião do Oeste", "Pitangui",
  ],
  defaultMessage:
    "Olá! Vim pelo site da Grace Cortez Atelier e gostaria de agendar um horário para conhecer os vestidos.",
};
