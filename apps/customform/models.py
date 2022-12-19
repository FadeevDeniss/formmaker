import uuid

from django.db import models
from django.utils.timezone import now

from apps.core.models import CommonFieldsModel


class FormManager(models.Manager):

    def get_recent(self):
        return super().get_queryset().filter(
            created__month=now().month
        )


class BaseFormModel(CommonFieldsModel):

    id = models.UUIDField(
        default=uuid.uuid4,
        editable=False,
        primary_key=True,)

    name = models.CharField(
        max_length=30,
        default="New form",
        verbose_name='',
        editable=True,)

    author = models.CharField(
        max_length=30,
        editable=True)

    description = models.CharField(
        max_length=100,
        editable=True,
        verbose_name='',
        default='Description',)

    objects = FormManager()

    def __str__(self):
        return f"Form id: {self.id}, name: {self.name}"


class BaseFieldModel(CommonFieldsModel):

    name = models.CharField(
        max_length=30,
        editable=True,
        verbose_name='')

    class FieldType(models.TextChoices):
        INPUT = 'CharField', 'Text (string)'
        TEXTAREA = 'TextArea', 'Text (paragraph)'
        SELECT = 'Choice', 'One from list'

    type = models.CharField(
        max_length=16,
        choices=FieldType.choices,
        editable=True,
        verbose_name='',
        default=FieldType.INPUT,)

    customform = models.ForeignKey(
        'BaseFormModel',
        on_delete=models.CASCADE,)


class BaseAnswerModel(CommonFieldsModel):

    answer = models.CharField(
        max_length=50,
        editable=True,
        verbose_name='',)

    customfield = models.ForeignKey(
        'BaseFieldModel',
        on_delete=models.CASCADE,)
